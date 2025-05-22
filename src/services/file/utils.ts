
import { supabase } from "@/integrations/supabase/client";

// Define the StorageError type as it's not directly exported from supabase-js
type StorageError = {
  message: string;
  statusCode?: number;
  name?: string;
};

export const handleBucketError = async (
  error: StorageError,
  originalBucket: string,
  userId: string,
  fileName: string,
  file: File
): Promise<string | null> => {
  console.error(`Error uploading to bucket ${originalBucket}:`, error);
  
  if (error.message.includes("Bucket not found") || error.message.includes("row-level security policy")) {
    console.log("Bucket error detected, attempting to create public bucket files...");
    
    const { error: filesError, data: filesData } = await supabase.storage
      .from("files")
      .upload(`${userId}/${fileName}`, file, {
        cacheControl: "3600",
        upsert: true
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
