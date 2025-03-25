
import { Link } from "react-router-dom";
import { MapPin, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Deal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";

interface MatchCardProps {
  deal: Deal;
}

export const MatchCard = ({ deal }: MatchCardProps) => {
  const [introducer, setIntroducer] = useState<{ id: string; name: string | null } | null>(null);
  
  useEffect(() => {
    const loadIntroducer = async () => {
      if (deal.introducedById) {
        try {
          const profileData = await fetchInvestorProfile(deal.introducedById);
          if (profileData) {
            setIntroducer({
              id: deal.introducedById,
              name: profileData.name
            });
          }
        } catch (error) {
          console.error("Error fetching introducer:", error);
        }
      }
    };
    
    loadIntroducer();
  }, [deal.introducedById]);

  return (
    <Link 
      to={`/deals/${deal.id}`}
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
            {introducer && (
              <div className="text-xs text-muted-foreground mt-0.5">
                Introduced by: <Link to={`/investor/${introducer.id}`} className="font-medium hover:text-primary transition-colors">{introducer.name || "Unknown Investor"}</Link>
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
  );
};
