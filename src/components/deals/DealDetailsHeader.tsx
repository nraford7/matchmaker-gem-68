
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EnhancedDeal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, MapPin, DollarSign, TrendingUp, Clock } from "lucide-react";
import DealActions from "./DealActions";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";
import { Link } from "react-router-dom";

interface DealDetailsHeaderProps {
  deal: EnhancedDeal;
  onGoBack: () => void;
}

const DealDetailsHeader = ({ deal, onGoBack }: DealDetailsHeaderProps) => {
  // In case matchScore isn't provided, use a default value (75% for demo purposes)
  const matchScore = deal.matchScore !== undefined ? deal.matchScore : 0.75;
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
    <>
      <Button variant="ghost" size="sm" onClick={onGoBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      
      <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{deal.name}</h1>
                {introducer && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Introduced by: <Link to={`/investor/${introducer.id}`} className="font-medium hover:underline text-primary">{introducer.name || "Unknown Investor"}</Link>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <DealActions dealId={deal.id} dealName={deal.name} />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {deal.sectorTags && deal.sectorTags.map((sector, index) => (
                <Badge key={index} variant="secondary">
                  {sector}
                </Badge>
              ))}
              
              {deal.stage && (
                <Badge variant="default">
                  {deal.stage}
                </Badge>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {deal.location || deal.geographies?.join(', ') || "Global"}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {deal.description}
          </p>
          
          <div className="space-y-3 pt-3 border-t border-border">
            {deal.checkSizeRequired && (
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground mr-2">Investment Ask:</span>
                <span className="font-medium ml-auto">${formatCurrency(deal.checkSizeRequired)}</span>
              </div>
            )}
            
            {typeof deal.IRR !== 'undefined' && deal.IRR !== null && (
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground mr-2">Estimated IRR:</span>
                <span className="font-medium ml-auto">{deal.IRR}%</span>
              </div>
            )}
            
            {deal.timeHorizon && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground mr-2">Estimated Time for Returns:</span>
                <span className="font-medium ml-auto">{deal.timeHorizon}</span>
              </div>
            )}
            
            {deal.recommendation && (
              <>
                <hr className="my-3 border-border" />
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Why we recommend this to you</h3>
                    <div className="flex flex-col items-center">
                      <span className="text-primary text-xl font-bold">{Math.round(matchScore * 100)}%</span>
                      <span className="text-primary text-xs">match</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{deal.recommendation}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DealDetailsHeader;
