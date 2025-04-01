
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
    const filePath = fileName;
    
    console.log(`Uploading file directly to bucket: ${bucket}`);

    // Try upload to the specified bucket
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error(`Error uploading to bucket ${bucket}:`, uploadError);
      
      // Create a new bucket if it doesn't exist
      if (uploadError.message.includes("Bucket not found") || uploadError.message.includes("row-level security policy")) {
        console.log("Bucket error detected, attempting to create public bucket files...");
        
        // Try uploading to a "files" bucket instead
        const { error: filesError, data: filesData } = await supabase.storage
          .from("files")
          .upload(`${userId}/${fileName}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        
        if (filesError) {
          console.error("Error uploading to files bucket:", filesError);
          toast.error("Failed to upload document");
          return null;
        }
        
        // Get the public URL for the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from("files")
          .getPublicUrl(`${userId}/${fileName}`);
        
        console.log("File uploaded successfully to files bucket:", publicUrlData.publicUrl);
        return publicUrlData.publicUrl;
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
    // or /object/public/bucket-name/user-id/filename
    const fileName = pathSegments[pathSegments.length - 1];
    const possibleUserId = pathSegments[pathSegments.length - 2];
    const possibleBucketName = pathSegments[pathSegments.length - 3] || bucket;
    
    console.log(`Attempting to delete file: ${fileName} from possible bucket: ${possibleBucketName}`);
    
    // Check if user has permission to delete
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) {
      console.error("User not authenticated for file deletion");
      return false;
    }

    // Try to delete from the original bucket first
    let { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    // If there's an error, try with a user path
    if (error) {
      console.error(`Error deleting from bucket ${bucket}:`, error);
      
      // If URL indicates a file in files bucket with user subfolder
      if (fileUrl.includes('/files/') && possibleUserId) {
        console.log("Trying to delete from files bucket with user path...");
        const { error: filesError } = await supabase.storage
          .from("files")
          .remove([`${possibleUserId}/${fileName}`]);
          
        if (filesError) {
          console.error("Error deleting file from files bucket:", filesError);
          return false;
        }
        return true;
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
