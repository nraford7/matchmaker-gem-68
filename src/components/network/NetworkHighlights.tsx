
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Loader2, RefreshCw, MessageSquare } from "lucide-react";
import { fetchRecommendationsForUser } from "@/services/investor";
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { NetworkHighlightsEmpty } from "./NetworkHighlightsEmpty";
import { NetworkHighlightsLoading } from "./NetworkHighlightsLoading";

export const NetworkHighlights = () => {
  const [sharedDeals, setSharedDeals] = useState<NetworkSharedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const loadSharedDeals = async () => {
    try {
      setLoading(true);
      console.log("Loading network shared deals...");
      const data = await fetchRecommendationsForUser();
      setSharedDeals(data);
      console.log("Loaded shared deals:", data);
    } catch (error) {
      console.error("Error loading shared deals:", error);
      toast.error("Failed to load network shared deals");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadSharedDeals();
  }, []);
  
  const handleViewDeal = (opportunityId: string) => {
    navigate(`/deals/${opportunityId}`);
  };
  
  // Loading state
  if (loading) {
    return <NetworkHighlightsLoading />;
  }
  
  // Empty state
  if (sharedDeals.length === 0) {
    return <NetworkHighlightsEmpty onReloadDeals={loadSharedDeals} />;
  }
  
  // Display shared deals
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
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={loadSharedDeals}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sharedDeals.map((deal) => (
            <div key={deal.id} className="border rounded-md p-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{deal.opportunityName}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(deal.sharedAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center text-sm mb-2 gap-1">
                <Users className="h-3 w-3 text-primary" />
                <span>Shared by <span className="font-medium">{deal.sharedBy}</span></span>
              </div>
              
              <div className="flex gap-2 text-xs text-muted-foreground mb-2">
                <span>{deal.sector}</span>
                <span>•</span>
                <span>{deal.stage}</span>
                <span>•</span>
                <span>${formatCurrency(deal.fundingAmount)}</span>
              </div>
              
              {deal.comment && (
                <div className="bg-muted p-2 rounded-md mb-2 flex gap-2">
                  <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-xs italic">{deal.comment}</p>
                </div>
              )}
              
              <div className="flex gap-2 mt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-7 text-xs w-full"
                  onClick={() => handleViewDeal(deal.opportunityId)}
                >
                  View Deal Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
