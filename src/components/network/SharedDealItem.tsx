
import { NetworkSharedDeal } from "@/types";
import { Handshake, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SharedDealItemProps {
  deal: NetworkSharedDeal;
}

export const SharedDealItem = ({ deal }: SharedDealItemProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/deals/${deal.deal_id || deal.opportunityId}`);
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
    <div className="border rounded-md p-3 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h4 
          className="font-medium line-clamp-1 cursor-pointer hover:text-primary hover:underline"
          onClick={handleViewDetails}
        >
          {deal.deal?.name || deal.opportunityName}
        </h4>
        <span className="text-xs text-muted-foreground shrink-0 ml-2">
          {new Date(deal.sharedAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="flex items-center text-sm mb-2 gap-2">
        <Avatar className="h-6 w-6">
          {(deal.avatar || deal.investor?.avatar_url) && <AvatarImage src={deal.avatar || deal.investor?.avatar_url} alt={deal.sharedBy || 'Investor'} />}
          <AvatarFallback className="text-xs">{getInitials(deal.sharedBy || 'Investor')}</AvatarFallback>
        </Avatar>
        <span>Shared by <span className="font-medium">{deal.sharedBy || 'Investor'}</span></span>
      </div>
      
      <div className="flex gap-2 text-xs text-muted-foreground mb-2">
        <span>{deal.sector || deal.deal?.sector_tags?.[0] || 'N/A'}</span>
        <span>•</span>
        <span>{deal.stage || deal.deal?.stage || 'N/A'}</span>
        <span>•</span>
        <span>${formatCurrency(Math.round(deal.fundingAmount || deal.deal?.check_size_required || 0))}</span>
      </div>
      
      {deal.comment && (
        <div className="bg-muted p-2 rounded-md mb-2 flex gap-2 mt-auto">
          <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
          <p className="text-xs italic">{deal.comment}</p>
        </div>
      )}
    </div>
  );
};
