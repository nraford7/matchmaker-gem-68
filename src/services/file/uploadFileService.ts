
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { handleBucketError } from "./utils";

export const uploadFile = async (
  file: File,
  bucket: string = "pitch-documents",
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  try {
    console.log(`Attempting to upload file to bucket: ${bucket}`);
    
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

    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const trackProgress = (progress: { loaded: number; total: number }) => {
        if (onProgress) {
          const progressPercentage = Math.round((progress.loaded / progress.total) * 100);
          onProgress(progressPercentage);
        }
      };
      
      const upload = async () => {
        try {
          const { error: uploadError, data } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadError) {
            const result = await handleBucketError(uploadError, bucket, userId, fileName, file);
            if (!result) {
              if (onProgress) onProgress(0);
              reject("Failed to upload document");
              return;
            }
            resolve(result);
            return;
          }

          const { data: publicUrlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);
          
          if (onProgress) onProgress(100);
          resolve(publicUrlData.publicUrl);
        } catch (error) {
          if (onProgress) onProgress(0);
          reject(error);
        }
      };
      
      upload();
    });
    
  } catch (error) {
    console.error("Error in uploadFile:", error);
    toast.error("Failed to upload document");
    return null;
  }
};
