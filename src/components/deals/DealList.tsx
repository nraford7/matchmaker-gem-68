
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp } from "lucide-react";
import { Deal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import DealActions from "./DealActions";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";

interface DealListProps {
  deals: Deal[];
  showMatchScore?: boolean;
}

interface IntroducerInfo {
  id: string;
  name: string | null;
}

export const DealList = ({ deals, showMatchScore = false }: DealListProps) => {
  const location = useLocation();
  const [introducers, setIntroducers] = useState<Record<string, IntroducerInfo>>({});
  
  useEffect(() => {
    // Fetch introducer information for all deals
    const fetchIntroducers = async () => {
      const introducerData: Record<string, IntroducerInfo> = {};
      
      for (const deal of deals) {
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
    
    if (deals.length > 0) {
      fetchIntroducers();
    }
  }, [deals]);
  
  return (
    <div className="space-y-4">
      {deals.map((deal) => (
        <Link 
          key={deal.id} 
          to={`/deals/${deal.id}`}
          state={{ from: location.pathname }}
          className="block hover:no-underline focus:outline-none"
        >
          <Card className="transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors">{deal.name}</h3>
                      {introducers[deal.id] && (
                        <div className="text-xs text-muted-foreground">
                          Introduced by: <span className="font-medium">{introducers[deal.id].name || "Unknown Investor"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {deal.sectorTags && deal.sectorTags.map((sector, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                    
                    {deal.stage && (
                      <Badge variant="outline" className="text-xs">
                        {deal.stage}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {deal.description || "No description available"}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {deal.location || deal.geographies?.join(', ') || "Global"}
                  </div>
                </div>
                
                <div className="flex flex-col justify-between border-l-0 md:border-l pl-0 md:pl-4 relative">
                  <div className="absolute top-0 right-0">
                    <DealActions dealId={deal.id} dealName={deal.name} />
                  </div>
                  
                  {deal.checkSizeRequired && (
                    <div className="mb-2 mt-6 md:mt-0">
                      <p className="text-sm text-muted-foreground">Investment Ask</p>
                      <p className="font-medium">${formatCurrency(deal.checkSizeRequired)}</p>
                    </div>
                  )}
                  
                  {typeof deal.IRR !== 'undefined' && deal.IRR !== null && (
                    <div className="mb-2">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Estimated IRR
                      </p>
                      <p className="font-medium">{deal.IRR}%</p>
                    </div>
                  )}
                  
                  {showMatchScore && deal.matchScore && (
                    <div>
                      <p className="text-sm text-muted-foreground">Match Score</p>
                      <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${Math.round(deal.matchScore * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-right mt-1 text-foreground">{Math.round(deal.matchScore * 100)}%</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
