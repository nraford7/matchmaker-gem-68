
import { NetworkSharedDeal } from "@/types";
import { MessageSquare, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 
            className="text-lg font-medium line-clamp-1 cursor-pointer hover:text-primary hover:underline"
            onClick={handleViewDetails}
          >
            {deal.opportunityName}
          </h3>
          <span className="text-xs text-muted-foreground shrink-0 ml-2">
            {new Date(deal.sharedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <MapPin className="h-3 w-3" />
          <span>{deal.location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="secondary">{deal.sector}</Badge>
          <Badge variant="secondary">
            ${(deal.fundingAmount / 1000000).toFixed(1)}M
          </Badge>
          <Badge variant="outline">{deal.stage}</Badge>
        </div>

        <div className="flex items-center text-sm mb-3 gap-2">
          <Avatar className="h-6 w-6">
            {deal.avatar && <AvatarImage src={deal.avatar} alt={deal.sharedBy} />}
            <AvatarFallback className="text-xs">{getInitials(deal.sharedBy)}</AvatarFallback>
          </Avatar>
          <span>Shared by <span className="font-medium">{deal.sharedBy}</span></span>
        </div>
        
        {deal.comment && (
          <div className="bg-muted p-2 rounded-md flex gap-2">
            <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
            <p className="text-xs italic">{deal.comment}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 mt-auto">
        <Button variant="ghost" size="sm" onClick={handleViewDetails} className="ml-auto">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
