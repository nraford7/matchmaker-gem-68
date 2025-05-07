
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EnhancedDeal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, MapPin, DollarSign, TrendingUp, Clock, ArrowUpCircle, ArrowDownCircle, Lightbulb } from "lucide-react";
import DealActions from "./DealActions";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";
import { Link } from "react-router-dom";
import DealRecommendation from "./DealRecommendation";

interface DealDetailsHeaderProps {
  deal: EnhancedDeal;
  onGoBack: () => void;
}

const DealDetailsHeader = ({ deal, onGoBack }: DealDetailsHeaderProps) => {
  // In case matchScore isn't provided, use a default value (75% for demo purposes)
  const matchScore = deal.matchScore !== undefined ? deal.matchScore : 0.75;
  const [introducer, setIntroducer] = useState<{ id: string; name: string | null } | null>(null);
  const isGoodMatch = matchScore >= 0.7;
  
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
          </div>
        </CardContent>
      </Card>
      
      {/* Investor Fit Analysis moved from tab to here */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-2">
          <h2 className="text-xl font-semibold">Investor Fit Analysis</h2>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {/* Match score section - horizontal full width */}
          <div className="bg-muted/20 rounded-lg p-4 flex items-center gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/10"></div>
              <div 
                className={`absolute inset-0 rounded-full border-4 border-l-transparent border-b-transparent border-r-transparent ${isGoodMatch ? 'border-t-primary' : 'border-t-destructive'}`}
                style={{ transform: `rotate(${Math.round(matchScore * 360)}deg)` }}
              ></div>
              <div className="text-2xl font-bold">{Math.round(matchScore * 100)}%</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {isGoodMatch ? 'Good Match' : 'Potential Mismatch'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your investment profile
              </p>
              <p className="text-sm mt-1">
                {isGoodMatch 
                  ? "This opportunity aligns well with your investment criteria and preferences."
                  : "This opportunity may not fully align with your typical investment parameters."}
              </p>
            </div>
          </div>
          
          {/* Two-column layout for alignment and consideration points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Alignment points */}
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
              <h3 className="text-base font-medium flex items-center mb-2 text-green-700 dark:text-green-400">
                <ArrowUpCircle className="h-4 w-4 mr-1" />
                Alignment Points
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-1">
                  <span className="text-green-500 mt-1">•</span>
                  {deal.stage && `Investment stage (${deal.stage}) matches your preferences`}
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-green-500 mt-1">•</span>
                  {deal.sectorTags && deal.sectorTags.length > 0 && 
                    `Industry focus (${deal.sectorTags[0]}) aligns with your interests`}
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-green-500 mt-1">•</span>
                  {deal.timeHorizon && 
                    `Time horizon (${deal.timeHorizon}) fits your investment timeline`}
                </li>
              </ul>
            </div>
            
            {/* Consideration points */}
            <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4">
              <h3 className="text-base font-medium flex items-center mb-2 text-orange-700 dark:text-orange-400">
                <ArrowDownCircle className="h-4 w-4 mr-1" />
                Consideration Points
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-1">
                  <span className="text-orange-500 mt-1">•</span>
                  {deal.checkSizeRequired && 
                    `Required investment (${deal.checkSizeRequired}) may be outside your range`}
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-orange-500 mt-1">•</span>
                  {deal.IRR && 
                    `Expected IRR (${deal.IRR}%) may not meet your return expectations`}
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-orange-500 mt-1">•</span>
                  {deal.geographies && deal.geographies.length > 0 && 
                    `Geographic focus (${deal.geographies.join(', ')}) may be outside your target regions`}
                </li>
              </ul>
            </div>
          </div>
          
          {/* Recommendation card */}
          <DealRecommendation recommendation={deal.recommendation || ""} />
          
          {/* Next steps section */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <Lightbulb className="h-4 w-4 mr-1 text-primary" />
              Next Steps
            </h4>
            <p className="text-sm text-muted-foreground">
              {isGoodMatch 
                ? "We recommend exploring this opportunity further. Schedule a meeting with the team to discuss potential terms." 
                : "Consider reviewing more details about this opportunity before making a decision."}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DealDetailsHeader;
