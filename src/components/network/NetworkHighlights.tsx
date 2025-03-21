
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { fetchNetworkSharedDeals, createSampleSharedDeals } from "@/services/investor/sharedDealsServices";
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { NetworkHighlightsEmpty } from "./NetworkHighlightsEmpty";
import { NetworkHighlightsLoading } from "./NetworkHighlightsLoading";
import { SharedDealItem } from "./SharedDealItem";

export const NetworkHighlights = () => {
  const [sharedDeals, setSharedDeals] = useState<NetworkSharedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const loadSharedDeals = async () => {
    try {
      setLoading(true);
      console.log("Loading network shared deals...");
      const data = await fetchNetworkSharedDeals();
      
      // If no deals are found, automatically create sample deals
      if (data.length === 0) {
        console.log("No shared deals found, creating samples...");
        await createSampleSharedDeals();
        // Fetch again after creating sample deals
        const newData = await fetchNetworkSharedDeals();
        setSharedDeals(newData);
      } else {
        setSharedDeals(data);
      }
      
      console.log("Loaded shared deals:", data);
    } catch (error) {
      console.error("Error loading shared deals:", error);
      toast.error("Failed to load network shared deals");
      
      // Even if there's an error, try to create sample deals
      try {
        await createSampleSharedDeals();
        const newData = await fetchNetworkSharedDeals();
        setSharedDeals(newData);
      } catch (innerError) {
        console.error("Error creating sample deals as fallback:", innerError);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadSharedDeals();
  }, []);
  
  // Loading state
  if (loading) {
    return <NetworkHighlightsLoading />;
  }
  
  // Empty state - should rarely happen now with our automatic sample creation
  if (sharedDeals.length === 0) {
    return <NetworkHighlightsEmpty />;
  }
  
  // Display shared deals in a two-column grid
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
