
export type Deal = {
  id: string;
  name: string;
  description?: string;
  dealType?: string;
  checkSizeRequired?: number;
  sectorTags?: string[];
  geographies?: string[];
  stage?: string;
  timeHorizon?: string;
  esgTags?: string[];
  involvementModel?: string;
  exitStyle?: string;
  dueDiligenceLevel?: string;
  decisionConvictionRequired?: number;
  investorSpeedRequired?: number;
  strategyProfile?: Record<string, any>;
  psychologicalFit?: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
  matchScore?: number;
  matchExplanation?: string;
};

export type EnhancedDeal = Deal & {
  teamSize?: number;
  foundedYear?: number;
  industry?: string;
  businessModel?: string;
  competitors?: string[];
  timeline?: string;
  revenue?: string;
  growth?: string;
  pitchDeckUrl?: string;
  contactEmail?: string;
  projectedIRR?: string;
  personalisedRecommendation?: string;
  team?: { name: string; role: string }[];
  use_of_funds?: { category: string; percentage: number }[];
  milestones?: { description: string; timeline: string }[];
};
