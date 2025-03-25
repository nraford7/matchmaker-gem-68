
import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { Deal } from "@/types";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import DealActions from "../DealActions";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";

interface DealCardHeaderProps {
  deal: Deal;
}

export const DealCardHeader = ({ deal }: DealCardHeaderProps) => {
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
    <CardHeader className="pb-2 relative">
      <div className="flex justify-between items-start">
        <div>
          <Link to={`/deals/${deal.id}`}>
            <h3 className="text-lg font-medium leading-tight line-clamp-2 hover:text-primary transition-colors">
              {deal.name}
            </h3>
          </Link>
          {introducer && (
            <div className="text-xs text-muted-foreground mt-0.5">
              Introduced by: <Link to={`/investor/${introducer.id}`} className="font-medium hover:text-primary transition-colors">{introducer.name || "Unknown Investor"}</Link>
            </div>
          )}
        </div>
        
        <div className="absolute top-4 right-4">
          <DealActions dealId={deal.id} dealName={deal.name} />
        </div>
      </div>
      
      {/* Stage badge and sector tags */}
      <div className="flex flex-wrap gap-2 justify-start mt-2">
        {deal.stage && (
          <Badge variant="default" className="text-xs font-semibold">
            {deal.stage}
          </Badge>
        )}
        {deal.sectorTags && deal.sectorTags.map((sector, idx) => (
          <Badge key={idx} variant="secondary" className="text-xs">
            {sector}
          </Badge>
        ))}
      </div>
      
      {deal.location && (
        <div className="text-xs text-muted-foreground mt-2">
          <MapPin className="h-3 w-3 inline mr-1" />
          {deal.location}
        </div>
      )}
    </CardHeader>
  );
};
