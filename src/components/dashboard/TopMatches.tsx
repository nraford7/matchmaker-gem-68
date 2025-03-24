
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, MapPin, DollarSign, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Deal } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface TopMatchesProps {
  topMatches: Deal[];
  loading?: boolean;
}

export const TopMatches = ({ topMatches, loading }: TopMatchesProps) => {
  const location = useLocation();
  
  if (loading) {
    return (
      <Card>
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Matches
          </CardTitle>
          <CardDescription>Investment opportunities that match your preferences</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-6">
            <p className="text-muted-foreground">Loading matches...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Top Matches
        </CardTitle>
        <CardDescription>Investment opportunities that match your preferences</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {topMatches.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">No matches found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topMatches.slice(0, 6).map((deal) => (
              <Link 
                key={deal.id} 
                to={`/deals/${deal.id}`}
                state={{ from: location.pathname }}
                className="block group"
              >
                <div className="border rounded-md p-4 h-full hover:border-primary hover:shadow-md transition-all bg-card">
                  {/* Deal name */}
                  <h3 className="font-medium mb-2 text-sm line-clamp-1">
                    {deal.name}
                  </h3>
                  
                  {/* Tags section */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {deal.sectorTags && deal.sectorTags.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs py-0 px-1.5">
                        {tag}
                      </Badge>
                    ))}
                    {deal.stage && (
                      <Badge variant="secondary" className="text-xs py-0 px-1.5">
                        {deal.stage}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Match score */}
                  {deal.matchScore && (
                    <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary mb-2">
                      {Math.round(deal.matchScore * 100)}% match
                    </Badge>
                  )}
                  
                  {/* Deal description with line clamp */}
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {deal.description || "No description available"}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {/* Location */}
                    {deal.location && (
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{deal.location}</span>
                      </div>
                    )}
                    
                    {/* Funding amount */}
                    {(deal.checkSizeRequired || deal.fundingAmount) && (
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span>${formatCurrency(deal.checkSizeRequired || deal.fundingAmount || 0)}</span>
                      </div>
                    )}
                    
                    {/* IRR if available */}
                    {deal.IRR !== undefined && (
                      <div className="flex items-center text-muted-foreground">
                        <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span>{deal.IRR}% IRR</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Match explanation - simplified for card view */}
                  {deal.matchExplanation && (
                    <div className="mt-2 text-xs text-muted-foreground line-clamp-1">
                      <span className="font-semibold">Why it matches:</span> {deal.matchExplanation}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/30 p-3">
        <Link to="/deals" className="w-full">
          <Button variant="outline" className="w-full group">
            <span>View All Matches</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
