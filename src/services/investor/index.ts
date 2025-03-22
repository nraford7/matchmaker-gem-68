
// Re-export investor-related services
export * from "./baseService";
// Export specific functions from fetchServices and profileServices to avoid conflicts
export { 
  fetchAllInvestors,
  fetchInvestorById,
  fetchFollowedInvestors
} from "./fetchServices";

export {
  fetchCurrentInvestorProfile,
  updateInvestorProfile,
  fetchInvestorProfileById
} from "./profileServices";

// Handle shared deals services
export * from "./sharedDealsServices";

// Export recommendations function
export { fetchRecommendationsForUser } from "./recommendations";
