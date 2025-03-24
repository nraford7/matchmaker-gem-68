
// Re-export everything from the service files
export * from "./baseService";
export * from "./allDealsService";
export * from "./activeDealsService";
export * from "./activeDealsServices";
export * from "./savedDealsService";
export * from "./savedDealsServices";
export * from "./createServices";
export * from "./sharedDealsService";
export * from "./pastDealsService";

// Export the fetchAllDeals function as fetchDeals for backward compatibility
export { fetchAllDeals as fetchDeals } from "./allDealsService";
