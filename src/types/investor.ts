
export type Investor = {
  id: string;
  name: string;
  email?: string;
  company?: string;
  avatar_url?: string;
  preferred_stages?: string[];
  preferred_geographies?: string[];
  check_size_min?: number;
  check_size_max?: number;
  investment_thesis?: string;
  deal_count: number;
  sector_tags?: string[]; // Added for backward compatibility
};

// Extended investor type with camelCase properties for the UI
export type NetworkInvestor = {
  id: string;
  name: string;
  email?: string;
  company?: string;
  avatar_url?: string;
  avatar?: string; // Alias for avatar_url
  preferred_stages?: string[];
  preferredStages?: string[]; // Alias for preferred_stages
  preferred_geographies?: string[];
  preferredGeographies?: string[]; // Alias for preferred_geographies
  check_size_min?: number;
  checkSizeMin?: number; // Alias for check_size_min
  check_size_max?: number;
  checkSizeMax?: number; // Alias for check_size_max
  investment_thesis?: string;
  investmentThesis?: string; // Alias for investment_thesis
  deal_count: number;
  dealCount?: number; // Alias for deal_count
  role?: string;
  source_of_wealth?: string[];
  preferred_assets?: string[];
  preferredAssets?: string[]; // Alias for preferred_assets
  values_filter?: string[];
  time_horizon?: string;
  timeHorizon?: string; // Alias for time_horizon
  structure?: string;
  aum?: string;
  geographic_focus?: string;
  stage_focus?: string;
  psychological_profile_raw?: Record<string, any>;
  psychologicalProfileRaw?: Record<string, any>; // Alias for psychological_profile_raw
  psychological_profile_weighted?: Record<string, any>;
  psychologicalProfileWeighted?: Record<string, any>; // Alias for psychological_profile_weighted
  strategy_profile?: Record<string, any>;
  strategyProfile?: Record<string, any>; // Alias for strategy_profile
  weighting_preferences?: Record<string, any>;
  weightingPreferences?: Record<string, any>; // Alias for weighting_preferences
  sector_tags?: string[];
  contextSectors?: string[]; // Alias for sector_tags
};
