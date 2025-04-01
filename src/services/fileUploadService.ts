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
    
    // Get the authenticated user before proceeding
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) {
      console.error("User not authenticated for upload");
      toast.error("Authentication required to upload files");
      return null;
    }
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    
    // Upload directly to the bucket root instead of a user-specific folder
    const filePath = fileName;
    
    console.log(`Uploading file directly to bucket: ${bucket}`);

    // Upload to the specified bucket
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
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
    
    // Get the filename from the path
    // The structure should now be: /object/public/bucket-name/filename
    // The filename should be at the last index
    const fileName = pathSegments[pathSegments.length - 1];
    
    console.log(`Attempting to delete file from bucket ${bucket}: ${fileName}`);
    
    // Check if user has permission to delete from this bucket
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) {
      console.error("User not authenticated for file deletion");
      return false;
    }

    // Delete from the specified bucket
    let { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    // If there's an error, try the public bucket as fallback
    if (error) {
      console.error(`Error deleting file from bucket ${bucket}:`, error);
      console.log("Trying fallback to 'public' bucket for deletion...");
      
      const { error: publicBucketError } = await supabase.storage
        .from("public")
        .remove([fileName]);
      
      if (publicBucketError) {
        console.error("Error deleting file from public bucket:", publicBucketError);
        return false;
      }
    }

    console.log("File deleted successfully");
    return true;
  } catch (error) {
    console.error("Error in deleteFile:", error);
    return false;
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
