
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Bookmark, CheckCircle, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DealCardProps {
  deal: Deal;
  showActions?: boolean;
  showMatchScore?: boolean;
  onSave?: (dealId: string) => void;
  onActivate?: (dealId: string) => void;
}

export const DealCard = ({ 
  deal, 
  showActions = true, 
  showMatchScore = false,
  onSave,
  onActivate
}: DealCardProps) => {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) onSave(deal.id);
  };
  
  const handleActivate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onActivate) onActivate(deal.id);
  };
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link to={`/deals/${deal.id}`}>
            <h3 className="text-lg font-medium leading-tight line-clamp-2 hover:text-primary transition-colors">
              {deal.name}
            </h3>
          </Link>
          {showMatchScore && deal.matchScore && (
            <Badge variant={deal.matchScore > 0.8 ? "default" : "outline"} className="ml-2">
              {Math.round(deal.matchScore * 100)}% match
            </Badge>
          )}
        </div>
        
        {/* Stage badge and sector tags */}
        <div className="flex flex-wrap gap-2 mt-2">
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
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-auto">
          {deal.description || "No description available"}
        </p>
        
        {/* Key details with icons */}
        <div className="mt-4 space-y-2 pt-2 border-t border-border">
          {deal.checkSizeRequired && (
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
              <span className="text-muted-foreground mr-2">Investment Ask:</span>
              <span className="font-medium ml-auto">${formatCurrency(deal.checkSizeRequired)}</span>
            </div>
          )}
          
          {deal.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
              <span className="text-muted-foreground mr-2">Estimated IRR:</span>
              <span className="font-medium ml-auto">{deal.location}</span>
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
      
      {showActions && (onSave || onActivate) && (
        <CardFooter className="pt-0">
          <div className="w-full flex items-center justify-end gap-2">
            {onSave && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSave}
                className="gap-1"
              >
                <Bookmark className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline">Save</span>
              </Button>
            )}
            
            {onActivate && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleActivate}
                className="gap-1"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline">Activate</span>
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
