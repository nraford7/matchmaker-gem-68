
// Re-export all investor-related services
export * from "./baseService";
export * from "./fetchServices";
export * from "./profileServices";
export * from "./connectionServices";
export * from "./randomProfileServices";

// Handle shared deals services
export * from "./shared-deals";

// Export recommendations function
export { fetchRecommendationsForUser } from "./recommendations";

// Sample data creation function
export const createSampleSharedDeals = async (): Promise<boolean> => {
  try {
    // This is a placeholder function for creating sample shared deals
    // In a real implementation, this would create actual database entries
    console.log("Creating sample shared deals");
    return true;
  } catch (error) {
    console.error("Error creating sample shared deals:", error);
    return false;
  }
};
