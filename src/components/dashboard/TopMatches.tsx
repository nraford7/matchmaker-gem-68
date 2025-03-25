import { Link, useLocation } from "react-router-dom";
import { ArrowRight, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Deal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface TopMatchesProps {
  topMatches: Deal[];
  loading?: boolean;
}

export const TopMatches = ({ topMatches, loading }: TopMatchesProps) => {
  const location = useLocation();
  
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Top Matches</CardTitle>
            </div>
            <CardDescription className="mt-1">
              Investment opportunities that match your preferences
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-center py-6">
            <p className="text-muted-foreground">Loading matches...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Top Matches</CardTitle>
          </div>
          <CardDescription className="mt-1">
            Investment opportunities that match your preferences
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {topMatches.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No matches found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {topMatches.slice(0, 6).map((deal) => (
              <Link 
                key={deal.id} 
                to={`/deals/${deal.id}`}
                state={{ from: location.pathname }}
                className="block group"
              >
                <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30">
                  <CardContent className="p-4 flex flex-col h-full">
                    <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors text-base">
                      {deal.name}
                    </h3>
                    
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
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {deal.description || "No description available"}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-1 text-xs mt-auto">
                      {deal.location && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          <span className="truncate">{deal.location}</span>
                        </div>
                      )}
                      
                      {(deal.checkSizeRequired || deal.fundingAmount) && (
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          <span>${formatCurrency(deal.checkSizeRequired || deal.fundingAmount || 0)}</span>
                        </div>
                      )}
                      
                      {deal.IRR !== undefined && (
                        <div className="flex items-center text-muted-foreground">
                          <TrendingUp className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          <span>{deal.IRR}% IRR</span>
                        </div>
                      )}
                    </div>
                    
                    {deal.matchScore && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="text-foreground font-medium">Match Score</span>
                          <span className="text-foreground font-medium">
                            {Math.round(deal.matchScore * 100)}%
                          </span>
                        </div>
                        
                        <Progress 
                          value={Math.round(deal.matchScore * 100)} 
                          className="h-1.5 mb-2" 
                        />
                        
                        {deal.matchExplanation && (
                          <p className="text-xs text-foreground line-clamp-1">
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
        
        {topMatches.length > 0 && topMatches.length <= 6 && (
          <Link to="/deals" className="w-full">
            <Button variant="outline" className="w-full group">
              <span>View All Matches</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </CardContent>
      {topMatches.length > 6 && (
        <CardFooter className="p-3">
          <Link to="/deals" className="w-full">
            <Button variant="outline" className="w-full group">
              <span>View All Matches</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};
