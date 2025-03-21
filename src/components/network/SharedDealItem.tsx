
import { NetworkSharedDeal } from "@/types";
import { MessageSquare, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SharedDealItemProps {
  deal: NetworkSharedDeal;
}

export const SharedDealItem = ({ deal }: SharedDealItemProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/deals/${deal.opportunityId}`);
  };
  
  // Get the initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div 
            className="font-medium text-lg hover:text-primary cursor-pointer"
            onClick={handleViewDetails}
          >
            {deal.opportunityName}
          </div>
          <Badge variant="outline">{deal.stage}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <MapPin className="h-3 w-3" />
          <span>{deal.fundingAmount > 0 ? formatCurrency(Math.round(deal.fundingAmount)) : 'Undisclosed'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        {deal.comment && (
          <div className="bg-muted p-2 rounded-md mb-3 flex gap-2">
            <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
            <p className="text-xs italic line-clamp-2">{deal.comment}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="secondary">{deal.sector}</Badge>
          <Badge variant="secondary">
            ${(deal.fundingAmount / 1000000).toFixed(1)}M
          </Badge>
        </div>
        
        <div className="flex items-center text-sm gap-2">
          <Avatar className="h-6 w-6">
            {deal.avatar && <AvatarImage src={deal.avatar} alt={deal.sharedBy} />}
            <AvatarFallback className="text-xs">{getInitials(deal.sharedBy)}</AvatarFallback>
          </Avatar>
          <span>Shared by <span className="font-medium">{deal.sharedBy}</span></span>
          <span className="text-xs text-muted-foreground ml-auto">
            {new Date(deal.sharedAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button variant="ghost" size="sm" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
