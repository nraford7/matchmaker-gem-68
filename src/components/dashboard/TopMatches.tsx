import { Link, useLocation } from "react-router-dom";
import { ArrowRight, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Deal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";

interface TopMatchesProps {
  topMatches: Deal[];
  loading?: boolean;
}

interface IntroducerInfo {
  id: string;
  name: string | null;
}

export const TopMatches = ({ topMatches, loading }: TopMatchesProps) => {
  const location = useLocation();
  const [introducers, setIntroducers] = useState<Record<string, IntroducerInfo>>({});
  
  useEffect(() => {
    // Fetch introducer information for all deals
    const fetchIntroducers = async () => {
      const introducerData: Record<string, IntroducerInfo> = {};
      
      for (const deal of topMatches) {
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
    
    if (topMatches.length > 0) {
      fetchIntroducers();
    }
  }, [topMatches]);
  
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
                  <CardContent className="p-4 flex flex-col h-full relative">
                    {deal.matchScore && (
                      <div className="absolute right-3 top-4 flex flex-col items-center bg-primary/10 rounded-md px-2 py-1 border border-primary/20">
                        <span className="text-sm font-bold text-primary leading-tight">
                          {Math.round(deal.matchScore * 100)}%
                        </span>
                        <span className="text-xs text-primary/80 font-medium leading-tight">Match</span>
                      </div>
                    )}
                    
                    <div className="mb-2">
                      <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors text-base pr-14">
                        {deal.name}
                      </h3>
                      {introducers[deal.id] && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Introduced by: <Link to={`/investor/${introducers[deal.id].id}`} className="font-medium hover:text-primary transition-colors">{introducers[deal.id].name || "Unknown Investor"}</Link>
                        </div>
                      )}
                    </div>
                    
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
                    
                    {deal.matchScore && deal.matchExplanation && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-foreground line-clamp-2">
                          {deal.matchExplanation}
                        </p>
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
