
import { supabase } from "@/integrations/supabase/client";

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
