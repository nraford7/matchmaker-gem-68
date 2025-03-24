
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, TrendingUp, MapPin, DollarSign } from "lucide-react";
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
        <CardHeader className="bg-muted/50 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
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
    <Card className="overflow-hidden border-border">
      <CardHeader className="bg-muted/50 pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Top Matches
        </CardTitle>
        <CardDescription>Investment opportunities that match your preferences</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {topMatches.length === 0 ? (
          <div className="text-center py-6">
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
                <Card className="hover:shadow-md transition-shadow hover:border-primary/20 h-full flex flex-col">
                  <CardContent className="p-4 flex flex-col h-full">
                    {/* Deal name */}
                    <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors text-base">
                      {deal.name}
                    </h3>
                    
                    {/* Tags section */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {deal.sectorTags && deal.sectorTags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {deal.stage && (
                        <Badge variant="outline" className="text-xs">
                          {deal.stage}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Deal description with line clamp */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {deal.description || "No description available"}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-1 text-xs mt-auto">
                      {/* Location */}
                      {deal.location && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          <span className="truncate">{deal.location}</span>
                        </div>
                      )}
                      
                      {/* Funding amount */}
                      {(deal.checkSizeRequired || deal.fundingAmount) && (
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          <span>${formatCurrency(deal.checkSizeRequired || deal.fundingAmount || 0)}</span>
                        </div>
                      )}
                      
                      {/* IRR if available */}
                      {deal.IRR !== undefined && (
                        <div className="flex items-center text-muted-foreground">
                          <TrendingUp className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          <span>{deal.IRR}% IRR</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Match score */}
                    {deal.matchScore && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="text-muted-foreground">Match Score</span>
                          <Badge variant="default" className="text-xs bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary">
                            {Math.round(deal.matchScore * 100)}%
                          </Badge>
                        </div>
                        
                        {/* Match explanation - simplified for card view */}
                        {deal.matchExplanation && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {deal.matchExplanation}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
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
