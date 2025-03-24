
// Re-export services with proper naming
export * from './fetchServices';
export * from './dealDetailsService';

// For backward compatibility
export { 
  fetchDeals as fetchOpportunities,
  fetchActiveDeals as fetchActiveOpportunities,
  fetchSavedDeals as fetchSavedOpportunities,
  fetchPastDeals as fetchPastOpportunities
} from './fetchServices';
