
import { Investor, NetworkInvestor } from "./investor";

export type NetworkDeal = {
  id: string;
  name: string;
  description?: string;
  sector_tags?: string[];
  sectorTags?: string[];
  stage?: string;
  check_size_required?: number;
  checkSizeRequired?: number;
  geographies?: string[];
};

export type NetworkSharedDeal = {
  id: string;
  deal: NetworkDeal;
  deal_id?: string;
  sharedAt: string;
  comment?: string;
  investor: NetworkInvestor;
  // For backward compatibility
  sharedBy?: string;
  avatar?: string;
  sector?: string;
  stage?: string;
  fundingAmount?: number;
  opportunityId?: string;
  opportunityName?: string;
};
