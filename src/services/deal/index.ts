
// Re-export services
export * from './baseService';
export * from './fetchAllDealsService';
export * from './fetchActiveDealsService';
export * from './fetchSavedDealsService';
export * from './fetchPastDealsService';
export * from './dealDetailsService';
export * from './activeDealsServices';
export * from './savedDealsServices';

// For backward compatibility
export { 
  fetchAllDeals as fetchDeals,
  fetchAllDeals as fetchOpportunities,
  fetchActiveDeals as fetchActiveOpportunities,
  fetchSavedDeals as fetchSavedOpportunities,
  fetchPastDeals as fetchPastOpportunities
} from './fetchAllDealsService';
