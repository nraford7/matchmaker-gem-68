
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
