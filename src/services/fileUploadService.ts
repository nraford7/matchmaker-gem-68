import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

/**
 * Uploads a file to Supabase storage and returns the URL
 */
export const uploadFile = async (
  file: File,
  bucket: string = "pitch-documents"
): Promise<string | null> => {
  try {
    console.log(`Attempting to upload file to bucket: ${bucket}`);
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Check if user has permission to upload to this bucket
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) {
      console.error("User not authenticated for upload");
      toast.error("Authentication required to upload files");
      return null;
    }

    // Try to upload to the specified bucket with authenticated user
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true, // Changed to true to allow overwriting if needed
      });

    if (uploadError) {
      console.error(`Error uploading to bucket ${bucket}:`, uploadError);
      
      // If there's an error with permissions, try the "public" bucket as fallback
      if (bucket !== "public") {
        console.log("Trying fallback to 'public' bucket...");
        return uploadFile(file, "public");
      }
      
      toast.error("Failed to upload document");
      return null;
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log("File uploaded successfully:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    toast.error("Failed to upload document");
    return null;
  }
};

/**
 * Triggers Make.com webhook with the document URL and returns the processed data
 */
export const triggerMakeAutomation = async (
  documentUrl: string,
  makeWebhookUrl: string
): Promise<any | null> => {
  try {
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentUrl,
        timestamp: new Date().toISOString(),
      }),
    });

    // Make.com should return the processed document data
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Make.com webhook error:", response.statusText);
      toast.error("Failed to process document");
      return null;
    }
  } catch (error) {
    console.error("Error triggering Make.com automation:", error);
    toast.error("Failed to process document");
    return null;
  }
};

/**
 * Deletes a file from Supabase storage
 */
export const deleteFile = async (
  fileUrl: string,
  bucket: string = "pitch-documents"
): Promise<boolean> => {
  try {
    // Extract the file path from the URL
    const url = new URL(fileUrl);
    const pathSegments = url.pathname.split('/');
    // The file name should be the last segment of the path
    const fileName = pathSegments[pathSegments.length - 1];
    
    console.log(`Attempting to delete file from bucket ${bucket}: ${fileName}`);
    
    // Check if user has permission to delete from this bucket
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) {
      console.error("User not authenticated for file deletion");
      return false;
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error(`Error deleting file from bucket ${bucket}:`, error);
      return false;
    }

    console.log("File deleted successfully");
    return true;
  } catch (error) {
    console.error("Error in deleteFile:", error);
    return false;
  }
};
