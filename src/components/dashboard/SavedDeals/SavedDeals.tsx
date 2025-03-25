
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Deal } from "@/types";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";
import { SavedDealsEmptyState } from "./EmptyState";
import { DealItem } from "./DealItem";

interface SavedDealsProps {
  savedDeals: Deal[];
  isLoading?: boolean;
}

interface IntroducerInfo {
  id: string;
  name: string | null;
}

export const SavedDeals = ({ savedDeals, isLoading = false }: SavedDealsProps) => {
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
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Deals</CardTitle>
          <CardDescription>Track your saved investment opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">Loading saved deals...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (savedDeals.length === 0) {
    return <SavedDealsEmptyState />;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Deals</CardTitle>
        <CardDescription>Track your saved investment opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedDeals.slice(0, 5).map((deal) => (
            <DealItem 
              key={deal.id}
              deal={deal}
              introducerId={deal.introducedById ? introducers[deal.id]?.id : null}
              introducerName={deal.introducedById ? introducers[deal.id]?.name : null}
            />
          ))}
        </div>
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
