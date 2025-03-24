
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Bookmark, CheckCircle } from "lucide-react";
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
    <Card className="h-full hover:shadow-md transition-shadow">
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
        <div className="flex gap-2 flex-wrap mt-1">
          {deal.sectorTags && deal.sectorTags.map((sector, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {sector}
            </Badge>
          ))}
          {deal.stage && (
            <Badge variant="outline" className="text-xs">
              {deal.stage}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {deal.description || "No description available"}
        </p>
        
        <div className="mt-4 text-sm space-y-1">
          {deal.checkSizeRequired && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check size:</span>
              <span className="font-medium">${formatCurrency(deal.checkSizeRequired)}</span>
            </div>
          )}
          {deal.geographies && deal.geographies.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{deal.geographies.join(', ')}</span>
            </div>
          )}
          {deal.timeHorizon && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time horizon:</span>
              <span className="font-medium">{deal.timeHorizon}</span>
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
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            )}
            
            {onActivate && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleActivate}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
