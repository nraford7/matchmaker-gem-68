import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types/deal";
import { uploadFile, deleteFile } from "./file";
import { toast } from "sonner";

export const getDeals = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase.from("deals").select("*");

    if (error) {
      console.error("Error fetching deals:", error);
      throw new Error("Failed to fetch deals");
    }

    return data || [];
  } catch (error: any) {
    console.error("Error in getDeals:", error.message);
    throw error;
  }
};

export const getDealById = async (id: string): Promise<Deal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching deal by ID:", error);
      return null;
    }

    return data || null;
  } catch (error: any) {
    console.error("Error in getDealById:", error.message);
    return null;
  }
};

export const createDeal = async (deal: Omit<Deal, "id" | "createdAt">): Promise<Deal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .insert(deal)
      .select("*")
      .single();

    if (error) {
      console.error("Error creating deal:", error);
      return null;
    }

    return data || null;
  } catch (error: any) {
    console.error("Error in createDeal:", error.message);
    return null;
  }
};

export const updateDeal = async (id: string, updates: Partial<Deal>): Promise<Deal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating deal:", error);
      return null;
    }

    return data || null;
  } catch (error: any) {
    console.error("Error in updateDeal:", error.message);
    return null;
  }
};

export const deleteDeal = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("deals").delete().eq("id", id);

    if (error) {
      console.error("Error deleting deal:", error);
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("Error in deleteDeal:", error.message);
    return false;
  }
};
