
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, MessageSquare, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchNetworkSharedDeals } from "@/services/dashboardService";
import { NetworkSharedDeal } from "@/types";
import { SampleDealsButton } from "@/components/network";

export const NetworkHighlights = () => {
  const [sharedDeals, setSharedDeals] = useState<NetworkSharedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadSharedDeals = async () => {
      try {
        const data = await fetchNetworkSharedDeals();
        setSharedDeals(data);
      } catch (error) {
        console.error("Error loading shared deals:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSharedDeals();
  }, []);
  
  if (loading) {
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
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">
              Loading shared deals...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (sharedDeals.length === 0) {
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
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No shared deals from your network yet
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">Find Investors to Follow</Button>
              <SampleDealsButton />
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
            <div key={deal.id} className="border rounded-md p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{deal.opportunityName}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(deal.sharedAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center text-sm mb-2 gap-1">
                <Handshake className="h-3 w-3 text-primary" />
                <span>Shared by <span className="font-medium">{deal.sharedBy}</span></span>
              </div>
              
              <div className="flex gap-2 text-xs text-muted-foreground mb-2">
                <span>{deal.sector}</span>
                <span>•</span>
                <span>{deal.stage}</span>
                <span>•</span>
                <span>${new Intl.NumberFormat().format(deal.fundingAmount)}</span>
              </div>
              
              {deal.comment && (
                <div className="bg-muted p-2 rounded-md mb-2 flex gap-2">
                  <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-xs italic">{deal.comment}</p>
                </div>
              )}
              
              <div className="flex gap-2 mt-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs">View Details</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">Thank {deal.sharedBy.split(' ')[0]}</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
