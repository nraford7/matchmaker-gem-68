
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { NetworkSharedDeal } from "@/types";
import { useNavigate } from "react-router-dom";
import { SharedDealItem } from "./SharedDealItem";

// Mock data for network shared deals that will always be available
const MOCK_SHARED_DEALS: NetworkSharedDeal[] = [
  {
    id: "mock-deal-1",
    deal_id: "sample-1",
    deal: {
      id: "sample-1",
      name: "EcoTech Solutions",
      sector_tags: ["CleanTech"],
      stage: "Series A",
      check_size_required: 3500000,
    },
    investor: {
      id: "investor-1",
      name: "Michael Chen",
      deal_count: 5
    },
    sector: "CleanTech",
    stage: "Series A",
    fundingAmount: 3500000,
    sharedBy: "Michael Chen",
    avatar: null,
    comment: "This company's innovative approach to renewable energy storage could be transformative. Worth a look given your interest in cleantech.",
    sharedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: "mock-deal-2",
    deal_id: "sample-2",
    deal: {
      id: "sample-2",
      name: "MedAI Diagnostics",
      sector_tags: ["Health Tech"],
      stage: "Seed",
      check_size_required: 1200000,
    },
    investor: {
      id: "investor-2",
      name: "Sarah Johnson",
      deal_count: 8
    },
    sector: "Health Tech",
    stage: "Seed",
    fundingAmount: 1200000,
    sharedBy: "Sarah Johnson",
    avatar: null,
    comment: "Their AI-powered diagnostic tool has shown impressive early results. The founding team has strong technical and medical backgrounds.",
    sharedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    id: "mock-deal-3",
    deal_id: "sample-3",
    deal: {
      id: "sample-3",
      name: "Secure Payments",
      sector_tags: ["FinTech"],
      stage: "Series B",
      check_size_required: 8000000,
    },
    investor: {
      id: "investor-3",
      name: "David Williams",
      deal_count: 12
    },
    sector: "FinTech",
    stage: "Series B",
    fundingAmount: 8000000,
    sharedBy: "David Williams",
    avatar: null,
    comment: "This payment security platform is gaining significant traction with major financial institutions. Their revenue growth is impressive.",
    sharedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days ago
  }
];

export const NetworkHighlights = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Network Highlights</CardTitle>
          </div>
          <CardDescription>
            Deals shared with you by investors in your network
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_SHARED_DEALS.map((deal) => (
            <SharedDealItem key={deal.id} deal={deal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
