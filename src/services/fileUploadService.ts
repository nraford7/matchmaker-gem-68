
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

/**
 * Creates a bucket in Supabase storage if it doesn't exist
 */
const ensureBucketExists = async (bucketName: string): Promise<boolean> => {
  try {
    // Check if the bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log(`Bucket ${bucketName} doesn't exist. Creating it...`);
      // Create the bucket if it doesn't exist
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: true, // Make bucket public to ensure files can be accessed
      });
      
      if (error) {
        console.error("Error creating bucket:", error);
        return false;
      }
      console.log(`Bucket ${bucketName} created successfully`);
      return true;
    }
    
    return true;
  } catch (error) {
    console.error("Error ensuring bucket exists:", error);
    return false;
  }
};

/**
 * Uploads a file to Supabase storage and returns the URL
 */
export const uploadFile = async (
  file: File,
  bucket: string = "pitch-documents"
): Promise<string | null> => {
  try {
    // Create the bucket if it doesn't exist
    const bucketExists = await ensureBucketExists(bucket);
    if (!bucketExists) {
      console.error(`Failed to create or access bucket ${bucket}`);
      toast.error("Failed to access storage");
      return null;
    }
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
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
