
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";

interface SavedDealsProps {
  savedDeals: Deal[];
}

interface IntroducerInfo {
  id: string;
  name: string | null;
}

export const SavedDeals = ({ savedDeals }: SavedDealsProps) => {
  const location = useLocation();
  const [introducers, setIntroducers] = useState<Record<string, IntroducerInfo>>({});
  
  useEffect(() => {
    // Fetch introducer information for all deals
    const fetchIntroducers = async () => {
      const introducerData: Record<string, IntroducerInfo> = {};
      
      for (const deal of savedDeals) {
        if (deal.introducedById) {
          try {
            const profileData = await fetchInvestorProfile(deal.introducedById);
            
            if (profileData) {
              introducerData[deal.id] = {
                id: deal.introducedById,
                name: profileData.name
              };
            }
          } catch (error) {
            console.error("Error fetching introducer profile:", error);
          }
        }
      }
      
      setIntroducers(introducerData);
    };
    
    if (savedDeals.length > 0) {
      fetchIntroducers();
    }
  }, [savedDeals]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Deals</CardTitle>
        <CardDescription>Track your saved investment opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        {savedDeals.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No saved deals yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedDeals.slice(0, 5).map((deal) => (
              <Link 
                key={deal.id} 
                to={`/deals/${deal.id}`}
                state={{ from: location.pathname }}
                className="block group"
              >
                <div className="flex justify-between items-center py-2 px-4 rounded-lg hover:bg-accent transition-colors">
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{deal.name}</p>
                    {introducers[deal.id] && (
                      <div className="text-xs text-muted-foreground">
                        Introduced by: <Link to={`/investor/${introducers[deal.id].id}`} className="font-medium hover:text-primary transition-colors">{introducers[deal.id].name || "Unknown Investor"}</Link>
                      </div>
                    )}
                    <div className="flex gap-2 mt-1">
                      {deal.sectorTags && deal.sectorTags[0] && (
                        <Badge variant="outline" className="text-xs">
                          {deal.sectorTags[0]}
                        </Badge>
                      )}
                      {deal.stage && (
                        <Badge variant="secondary" className="text-xs">
                          {deal.stage}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link to="/deals" className="w-full">
          <Button variant="outline" className="w-full">
            View All Deals
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
