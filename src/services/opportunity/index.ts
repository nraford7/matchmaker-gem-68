
// Re-export everything from the service files
export * from "./baseService";
export * from "./fetchServices";
export * from "./activeDealsServices";
export * from "./savedDealsServices";
export * from "./createServices";
export * from "./matchFeedbackService";

// Export the fetchDeals function as fetchSavedDeals for backward compatibility
export { fetchDeals as fetchSavedDeals } from "./fetchServices";
