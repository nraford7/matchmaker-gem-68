
import { supabase } from "@/integrations/supabase/client";
import { Investor } from "@/types";
import { getCurrentUserId } from "./baseService";
import { toast } from "sonner";
import { createRandomInvestorProfile } from "./randomProfileServices";

// Process a CSV file and create investor profiles
export const processCSVFile = async (file: File): Promise<boolean> => {
  try {
    const text = await file.text();
    const rows = text.split("\n");
    
    // Extract headers (first row)
    const headers = rows[0].split(",").map(header => header.trim());
    
    // Validate required fields
    const requiredFields = ["name", "email"];
    const missingFields = requiredFields.filter(field => !headers.includes(field));
    
    if (missingFields.length > 0) {
      toast.error(`CSV is missing required fields: ${missingFields.join(", ")}`);
      return false;
    }
    
    // Process data rows
    const successCount = await processRows(rows.slice(1), headers);
    
    if (successCount > 0) {
      toast.success(`Successfully imported ${successCount} investor profiles`);
      return true;
    } else {
      toast.error("No investor profiles were imported");
      return false;
    }
  } catch (error) {
    console.error("Error processing CSV file:", error);
    toast.error("Failed to process CSV file");
    return false;
  }
};

// Process a JSON file and create investor profiles
export const processJSONFile = async (file: File): Promise<boolean> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (!Array.isArray(data)) {
      toast.error("JSON file must contain an array of investor profiles");
      return false;
    }
    
    let successCount = 0;
    
    for (const item of data) {
      if (!item.name || !item.email) {
        console.warn("Skipping item without required name or email:", item);
        continue;
      }
      
      const success = await createOrUpdateProfile(item);
      if (success) successCount++;
    }
    
    if (successCount > 0) {
      toast.success(`Successfully imported ${successCount} investor profiles`);
      return true;
    } else {
      toast.error("No investor profiles were imported");
      return false;
    }
  } catch (error) {
    console.error("Error processing JSON file:", error);
    toast.error("Failed to process JSON file");
    return false;
  }
};

// Process rows from CSV and create investor profiles
const processRows = async (rows: string[], headers: string[]): Promise<number> => {
  let successCount = 0;
  
  for (const row of rows) {
    if (!row.trim()) continue; // Skip empty rows
    
    const values = row.split(",").map(value => value.trim());
    if (values.length !== headers.length) {
      console.warn("Skipping row with mismatched column count:", row);
      continue;
    }
    
    // Create object from row
    const item: Record<string, any> = {};
    headers.forEach((header, index) => {
      // Handle array fields
      if (["contextSectors", "preferredStages", "preferredGeographies"].includes(header)) {
        item[header] = values[index] ? values[index].split(";") : [];
      } 
      // Handle numeric fields
      else if (["checkSizeMin", "checkSizeMax"].includes(header)) {
        item[header] = values[index] ? parseInt(values[index], 10) : null;
      }
      // Handle all other fields as strings
      else {
        item[header] = values[index];
      }
    });
    
    if (!item.name || !item.email) {
      console.warn("Skipping row without required name or email:", item);
      continue;
    }
    
    const success = await createOrUpdateProfile(item);
    if (success) successCount++;
  }
  
  return successCount;
};

// Create or update an investor profile
const createOrUpdateProfile = async (data: Record<string, any>): Promise<boolean> => {
  try {
    // Generate a UUID for the new profile
    const uuid = crypto.randomUUID();
    
    // Directly insert into the database with error handling
    const { error } = await supabase
      .from("investor_profiles")
      .insert({
        id: uuid,
        name: data.name,
        email: data.email,
        company: data.company || null,
        context_sectors: data.contextSectors || [],
        preferred_stages: data.preferredStages || [],
        preferred_geographies: data.preferredGeographies || [],
        check_size_min: data.checkSizeMin || null,
        check_size_max: data.checkSizeMax || null,
        investment_thesis: data.investmentThesis || null,
        deal_count: Math.floor(Math.random() * 10) + 1 // Random deal count between 1-10
      });
    
    if (error) {
      console.error("Error creating investor profile:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error creating/updating investor profile:", error);
    return false;
  }
};
