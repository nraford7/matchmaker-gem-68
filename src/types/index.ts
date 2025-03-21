export interface Investor {
  id: string;
  name: string;
  email: string;
  preferredSectors: string[];
  preferredStages: string[];
  checkSizeMin: number;
  checkSizeMax: number;
  preferredGeographies: string[];
  investmentThesis: string;
}

export interface NetworkInvestor {
  id: string;
  name: string;
  company: string;
  sectors: string[];
  dealCount: number;
  avatar: string | null;
  email?: string;
  preferredStages?: string[];
  checkSizeMin?: number;
  checkSizeMax?: number;
  preferredGeographies?: string[];
  investmentThesis?: string;
}

export interface Opportunity {
  id: string;
  name: string;
  description: string;
  sector: string;
  stage: string;
  fundingAmount: number;
  location: string;
  pitchDeck?: string;
  createdAt: string;
  matchScore?: number;
  matchExplanation?: string;
}

export interface Match {
  id: string;
  investorId: string;
  opportunityId: string;
  score: number;
  explanation: string;
  createdAt: string;
  isRead: boolean;
  feedback?: 'positive' | 'negative' | null;
}

// NetworkSharedDeal type for shared opportunities
export interface NetworkSharedDeal {
  id: string;
  opportunityId: string;
  opportunityName: string;
  sector: string;
  stage: string;
  fundingAmount: number;
  sharedBy: string;
  avatar: string | null;
  comment: string | null;
  sharedAt: string;
  location: string;
}
