
// Re-export all investor-related services
export * from "./baseService";
export * from "./fetchServices";
export * from "./profileServices";
export * from "./connectionServices";

// Handle shared deals services
export * from "./sharedDealsServices";

// Explicitly re-export from recommendations to prevent naming conflicts
// with sharedDealsServices
export {
  fetchRecommendationsForUser,
  recommendDealToInvestor,
  // Not re-exporting shareDealWithInvestor since it's already exported from sharedDealsServices
} from "./recommendations";
