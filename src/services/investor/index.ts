
// Re-export all investor-related services
export * from "./baseService";
export * from "./fetchServices";
export * from "./profileServices";
export * from "./connectionServices";

// Handle shared deals services
export * from "./sharedDealsServices";

// Export recommendations function
export { fetchRecommendationsForUser } from "./recommendations";
