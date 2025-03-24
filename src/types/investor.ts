
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
};

// Extended investor type for the network functionality
export type NetworkInvestor = Investor & {
  role?: string;
  source_of_wealth?: string[];
  preferred_assets?: string[];
  values_filter?: string[];
  time_horizon?: string;
  structure?: string;
  aum?: string;
  geographic_focus?: string;
  stage_focus?: string;
  psychological_profile_raw?: Record<string, any>;
  psychological_profile_weighted?: Record<string, any>;
  strategy_profile?: Record<string, any>;
  weighting_preferences?: Record<string, any>;
  sector_tags?: string[];
};
