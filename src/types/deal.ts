
import { Opportunity } from "@/types";

export type EnhancedOpportunity = Opportunity & {
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
