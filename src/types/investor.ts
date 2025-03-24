
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
