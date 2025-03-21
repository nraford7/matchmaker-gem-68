
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OpportunityList } from "@/components/OpportunityList";
import { Opportunity } from "@/types";
import { HandShake, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockOpportunities } from "@/data/mockData";

// Mock data for network shared deals
const mockNetworkDeals: (Opportunity & { 
  sharedBy: string;
  sharedDate: string;
  comment?: string;
})[] = [
  {
    ...mockOpportunities[2],
    sharedBy: "Michael Chen",
    sharedDate: new Date(2023, 7, 18).toISOString(),
    comment: "Strong founding team with previous exits. Worth looking into."
  },
  {
    ...mockOpportunities[4],
    sharedBy: "Sarah Johnson",
    sharedDate: new Date(2023, 7, 15).toISOString()
  }
];

export const NetworkSharedDeals = () => {
  const [sharedDeals] = useState(mockNetworkDeals);
  
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
            <Button variant="outline">Find Investors to Follow</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Users className="h-5 w-5" />
          Network Highlights
        </h2>
        <p className="text-muted-foreground">
          Deals shared by investors in your network
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sharedDeals.map((deal) => (
          <Card key={`${deal.id}-${deal.sharedBy}`} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{deal.name}</CardTitle>
                <div className="text-xs font-medium text-muted-foreground">
                  {new Date(deal.sharedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center text-sm gap-1">
                <HandShake className="h-3 w-3 text-primary" />
                <span>Shared by <span className="font-medium">{deal.sharedBy}</span></span>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm line-clamp-2 mb-2">{deal.description}</p>
              
              {deal.comment && (
                <div className="bg-muted p-2 rounded-md mb-2 flex gap-2">
                  <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-xs italic">{deal.comment}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-1 mt-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs">View Details</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">Thank {deal.sharedBy.split(' ')[0]}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
