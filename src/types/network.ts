
import { Investor, NetworkInvestor } from "./investor";

export type NetworkDeal = {
  id: string;
  name: string;
  description?: string;
  sector_tags?: string[];
  stage?: string;
  check_size_required?: number;
  geographies?: string[];
};

export type NetworkSharedDeal = {
  id: string;
  deal: NetworkDeal;
  investor: NetworkInvestor;
  comment?: string;
  sharedAt: string;
  deal_id?: string;
  sharedBy?: string;
  avatar?: string;
  sector?: string;
  stage?: string;
  fundingAmount?: number;
};
