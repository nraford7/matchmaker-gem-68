
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Loader2 } from "lucide-react";
import { NetworkSharedDeal } from "@/types";
import { useNavigate } from "react-router-dom";
import { SharedDealItem } from "./SharedDealItem";
import { fetchRecommendationsForUser } from "@/services/investor";
import { NetworkHighlightsEmpty } from "./NetworkHighlightsEmpty";
import { NetworkHighlightsLoading } from "./NetworkHighlightsLoading";

export const NetworkHighlights = () => {
  const [sharedDeals, setSharedDeals] = useState<NetworkSharedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadSharedDeals = async () => {
      setLoading(true);
      try {
        const deals = await fetchRecommendationsForUser();
        setSharedDeals(deals);
      } catch (error) {
        console.error("Error loading shared deals:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSharedDeals();
  }, []);
  
  if (loading) {
    return <NetworkHighlightsLoading />;
  }
  
  if (sharedDeals.length === 0) {
    return <NetworkHighlightsEmpty />;
  }
  
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
          {sharedDeals.map((deal) => (
            <SharedDealItem key={deal.id} deal={deal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
