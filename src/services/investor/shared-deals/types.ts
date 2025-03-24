
import { NetworkDeal, NetworkInvestor } from "@/types";

export interface SharedDeal {
  id: string;
  deal_id: string;
  shared_by_user_id: string;
  shared_with_user_id: string;
  comment: string;
  created_at: string;
  // Joined fields
  deal?: NetworkDeal;
  shared_by_user?: NetworkInvestor;
}

// Define a type that accepts the actual structure returned by Supabase
export interface DatabaseConnectionResult {
  following_id: string;
  following: {
    id: string;
    name: string;
    email: string | null;
    company: string | null;
    avatar_url: string | null;
  } | null;
}
