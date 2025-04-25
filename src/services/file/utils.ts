
import { supabase } from "@/integrations/supabase/client";
import { StorageError } from "@supabase/storage-js";

export const handleBucketError = async (
  error: StorageError,
  originalBucket: string,
  userId: string,
  fileName: string,
  file: File,
  onProgress?: (event: ProgressEvent) => void
): Promise<string | null> => {
  console.error(`Error uploading to bucket ${originalBucket}:`, error);
  
  if (error.message.includes("Bucket not found") || error.message.includes("row-level security policy")) {
    console.log("Bucket error detected, attempting to create public bucket files...");
    
    const { error: filesError, data: filesData } = await supabase.storage
      .from("files")
      .upload(`${userId}/${fileName}`, file, {
        cacheControl: "3600",
        upsert: true,
        onUploadProgress: onProgress
      });
    
    if (filesError) {
      console.error("Error uploading to files bucket:", filesError);
      return null;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from("files")
      .getPublicUrl(`${userId}/${fileName}`);
    
    return publicUrlData.publicUrl;
  }
  
  return null;
};
