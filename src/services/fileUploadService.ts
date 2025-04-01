
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

/**
 * Ensures that a bucket exists in Supabase storage
 */
const ensureBucketExists = async (bucketName: string): Promise<boolean> => {
  try {
    // Check if the bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    // If bucket doesn't exist, create it
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false, // Set to true if files should be publicly accessible
      });
      
      if (error) {
        console.error("Error creating bucket:", error);
        return false;
      }
      console.log(`Bucket ${bucketName} created successfully`);
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
    // Ensure the bucket exists before uploading
    const bucketExists = await ensureBucketExists(bucket);
    if (!bucketExists) {
      throw new Error("Failed to create storage bucket");
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
