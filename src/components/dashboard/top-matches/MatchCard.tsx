
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Deal } from "@/types";
import { MatchScore } from "./MatchScore";
import { MatchIntroducer } from "./MatchIntroducer";
import { MatchMetrics } from "./MatchMetrics";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";

interface MatchCardProps {
  deal: Deal;
}

export const MatchCard = ({ deal }: MatchCardProps) => {
  const location = useLocation();
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
      state={{ from: location.pathname }}
      className="block group"
    >
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30">
        <CardContent className="p-4 flex flex-col h-full relative">
          {deal.matchScore && <MatchScore score={deal.matchScore} />}
          
          <div className="mb-2">
            <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors text-base pr-14">
              {deal.name}
            </h3>
            {introducer && (
              <MatchIntroducer 
                introducerId={introducer.id} 
                name={introducer.name} 
              />
            )}
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            {deal.sectorTags?.slice(0, 2).map((tag, idx) => (
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
          
          <MatchMetrics 
            location={deal.location}
            checkSizeRequired={deal.checkSizeRequired}
            fundingAmount={deal.fundingAmount}
            IRR={deal.IRR}
          />
          
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
