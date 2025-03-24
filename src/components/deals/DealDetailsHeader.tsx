
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EnhancedDeal } from "@/types/deal";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, MapPin, DollarSign, TrendingUp, Clock } from "lucide-react";
import DealActions from "./DealActions";

interface DealDetailsHeaderProps {
  deal: EnhancedDeal;
  onGoBack: () => void;
}

const DealDetailsHeader = ({ deal, onGoBack }: DealDetailsHeaderProps) => {
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
              <h1 className="text-2xl font-bold">{deal.name}</h1>
              <div className="flex items-center gap-2">
                {deal.matchScore && (
                  <Badge variant={deal.matchScore > 0.8 ? "default" : "outline"} className="ml-2">
                    {Math.round(deal.matchScore * 100)}% match
                  </Badge>
                )}
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
    </>
  );
};

export default DealDetailsHeader;
