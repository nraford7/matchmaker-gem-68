
import { NetworkSharedDeal } from "@/types";
import { Handshake, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SharedDealItemProps {
  deal: NetworkSharedDeal;
}

export const SharedDealItem = ({ deal }: SharedDealItemProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/deals/${deal.opportunityId}`);
  };
  
  return (
    <div className="border rounded-md p-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{deal.opportunityName}</h4>
        <span className="text-xs text-muted-foreground">
          {new Date(deal.sharedAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="flex items-center text-sm mb-2 gap-1">
        <Handshake className="h-3 w-3 text-primary" />
        <span>Shared by <span className="font-medium">{deal.sharedBy}</span></span>
      </div>
      
      <div className="flex gap-2 text-xs text-muted-foreground mb-2">
        <span>{deal.sector}</span>
        <span>•</span>
        <span>{deal.stage}</span>
        <span>•</span>
        <span>${formatCurrency(deal.fundingAmount)}</span>
      </div>
      
      {deal.comment && (
        <div className="bg-muted p-2 rounded-md mb-2 flex gap-2">
          <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
          <p className="text-xs italic">{deal.comment}</p>
        </div>
      )}
      
      <div className="flex gap-2 mt-2">
        <Button 
          variant="default" 
          size="sm" 
          className="h-7 text-xs w-full"
          onClick={handleViewDetails}
        >
          View Deal Details
        </Button>
      </div>
    </div>
  );
};
