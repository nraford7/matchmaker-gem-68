
import { Investor } from "./investor";

export type NetworkDeal = {
  id: string;
  name: string;
  description?: string;
  sectorTags?: string[];
  stage?: string;
  checkSizeRequired?: number;
  geographies?: string[];
};

export type NetworkSharedDeal = {
  id: string;
  deal: NetworkDeal;
  investor: Investor;
  comment?: string;
  sharedAt: string;
};
