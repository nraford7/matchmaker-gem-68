
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Loader2 } from "lucide-react";
import { fetchNetworkSharedDeals } from "@/services/investor";
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { NetworkHighlightsLoading } from "./NetworkHighlightsLoading";
import { NetworkHighlightsEmpty } from "./NetworkHighlightsEmpty";
import { SharedDealItem } from "./SharedDealItem";

export const NetworkHighlights = () => {
  const [sharedDeals, setSharedDeals] = useState<NetworkSharedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  
  const loadSharedDeals = async () => {
    try {
      setLoading(true);
      const data = await fetchNetworkSharedDeals();
      console.log("Shared deals loaded:", data);
      setSharedDeals(data);
    } catch (error) {
      console.error("Error loading shared deals:", error);
      toast.error("Failed to load shared deals");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadSharedDeals();
  }, []);
  
  if (loading) {
    return <NetworkHighlightsLoading />;
  }
  
  if (sharedDeals.length === 0) {
    return <NetworkHighlightsEmpty onReloadDeals={loadSharedDeals} />;
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Network Highlights</CardTitle>
        </div>
        <CardDescription>
          Deals shared by investors in your network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sharedDeals.map((deal) => (
            <SharedDealItem key={deal.id} deal={deal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
