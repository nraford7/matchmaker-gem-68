
// Re-export everything from the service files
export * from "./baseService";
export * from "./fetchServices";
export * from "./activeDealsServices";
export * from "./savedDealsServices";
export * from "./createServices";
export * from "./matchFeedbackService";

// Export the fetchSavedDeals function from fetchServices (if it exists there)
export { fetchDeals as fetchSavedDeals } from "./fetchServices";
