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
  role?: string;
  sourceOfWealth?: string;
  preferredAssets?: string[];
  valuesFilter?: string[];
  timeHorizon?: string;
  psychologicalProfileRaw?: {
    Cautious: number;
    Methodical: number;
    Individualist: number;
    Spontaneous: number;
  };
  psychologicalProfileWeighted?: {
    Cautious: number;
    Methodical: number;
    Individualist: number;
    Spontaneous: number;
  };
  strategyProfile?: {
    checkSizeBehavior: string;
    dueDiligence: string;
    timeHorizon: string;
    exitStrategy: string;
    sectors: string[];
    esg: string[];
    involvementLevel: string;
  };
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
  role?: string;
  sourceOfWealth?: string;
  preferredAssets?: string[];
  valuesFilter?: string[];
  timeHorizon?: string;
  psychologicalProfileRaw?: {
    Cautious: number;
    Methodical: number;
    Individualist: number;
    Spontaneous: number;
  };
  psychologicalProfileWeighted?: {
    Cautious: number;
    Methodical: number;
    Individualist: number;
    Spontaneous: number;
  };
  strategyProfile?: {
    checkSizeBehavior: string;
    dueDiligence: string;
    timeHorizon: string;
    exitStrategy: string;
    sectors: string[];
    esg: string[];
    involvementLevel: string;
  };
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

export interface NetworkSharedDeal {
  id: string;
  opportunityId: string;
  opportunityName: string;
  sector: string;
  stage: string;
  fundingAmount: number;
  location: string;
  sharedBy: string;
  avatar: string | null;
  comment: string | null;
  sharedAt: string;
}
