
// Re-export everything from the service files
export * from "./baseService";
export * from "./fetchAllDealsService";
export * from "./fetchActiveDealsService";
export * from "./fetchSavedDealsService";
export * from "./fetchPastDealsService";
export * from "./savedDealsServices";
export * from "./createServices";
export * from "./sharedDealsService";

// Re-export with explicit names to avoid ambiguity
export { activateDeal, completeDeal } from "./activeDealsServices";

// Export the fetchAllDeals function as fetchDeals for backward compatibility
export { fetchAllDeals as fetchDeals } from "./fetchAllDealsService";
