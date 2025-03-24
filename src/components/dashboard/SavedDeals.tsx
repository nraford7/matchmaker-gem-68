
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types";

interface SavedDealsProps {
  savedDeals: Deal[];
}

export const SavedDeals = ({ savedDeals }: SavedDealsProps) => {
  const location = useLocation();
  
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
