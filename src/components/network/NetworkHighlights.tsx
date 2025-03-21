
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Loader2 } from "lucide-react";
import { fetchRecommendationsForUser } from "@/services/investor";
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { NetworkHighlightsLoading } from "./NetworkHighlightsLoading";
import { NetworkHighlightsEmpty } from "./NetworkHighlightsEmpty";
import { SharedDealItem } from "./SharedDealItem";

export const NetworkHighlights = () => {
  const [recommendations, setRecommendations] = useState<NetworkSharedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Loading recommendations...");
      const data = await fetchRecommendationsForUser();
      console.log("Recommendations loaded:", data);
      setRecommendations(data);
    } catch (error) {
      console.error("Error loading recommendations:", error);
      setError("Failed to load recommendations");
      toast.error("Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadRecommendations();
  }, []);
  
  if (loading) {
    return <NetworkHighlightsLoading />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Network Highlights</CardTitle>
          </div>
          <CardDescription>
            Deals recommended by investors in your network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!recommendations || recommendations.length === 0) {
    return <NetworkHighlightsEmpty onReloadDeals={loadRecommendations} />;
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Network Highlights</CardTitle>
        </div>
        <CardDescription>
          Deals recommended by investors in your network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((deal) => (
            <SharedDealItem key={deal.id} deal={deal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
