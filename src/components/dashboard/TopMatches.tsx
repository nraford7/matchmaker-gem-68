
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types";

interface TopMatchesProps {
  topMatches: Deal[];
}

export const TopMatches = ({ topMatches }: TopMatchesProps) => {
  const location = useLocation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Matches</CardTitle>
        <CardDescription>Investment opportunities that match your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        {topMatches.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No matches found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topMatches.slice(0, 5).map((deal) => (
              <Link 
                key={deal.id} 
                to={`/deals/${deal.id}`}
                state={{ from: location.pathname }}
                className="block group"
              >
                <div className="flex justify-between items-center py-2 px-4 rounded-lg hover:bg-accent transition-colors">
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {deal.name}
                    </p>
                    <div className="flex gap-2 mt-1">
                      {deal.matchScore && (
                        <Badge variant="default" className="text-xs">
                          {Math.round(deal.matchScore * 100)}% match
                        </Badge>
                      )}
                      {deal.sectorTags && deal.sectorTags[0] && (
                        <Badge variant="outline" className="text-xs">
                          {deal.sectorTags[0]}
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
            View All Matches
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
