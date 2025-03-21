
import { useState } from "react";
import { Opportunity } from "@/types";
import { Handshake, MessageSquare, Users } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <p className="text-lg text-muted-foreground mb-4">
          No shared deals from your network yet
        </p>
        <Button variant="outline">Find Investors to Follow</Button>
      </div>
    );
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sharedDeals.map((deal) => (
        <div key={`${deal.id}-${deal.sharedBy}`} className="bg-background border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium">{deal.name}</h3>
            <div className="text-xs font-medium text-muted-foreground">
              {new Date(deal.sharedDate).toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex items-center text-sm gap-1 mb-2">
            <Handshake className="h-3 w-3 text-primary" />
            <span>Shared by <span className="font-medium">{deal.sharedBy}</span></span>
          </div>
          
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
        </div>
      ))}
    </div>
  );
};
