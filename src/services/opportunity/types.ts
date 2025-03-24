
import { NetworkInvestor, NetworkDeal } from "@/types";

export interface SharedDeal {
  id: string;
  deal_id: string;
  shared_by_user_id: string;
  shared_with_user_id: string;
  comment: string;
  created_at: string;
  // Joined fields
  deal?: NetworkDeal;
  shared_by_user?: Partial<NetworkInvestor>;
}
