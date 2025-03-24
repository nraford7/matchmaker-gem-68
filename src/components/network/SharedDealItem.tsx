
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
    // Use deal_id with fallback to opportunityId for backwards compatibility
    navigate(`/deals/${deal.deal_id || deal.deal?.id || deal.opportunityId}`);
  };
  
  // Get the initials for avatar fallback
  const getInitials = (name: string = ''): string => {
    return name
      .split(' ')
      .map(part => part[0] || '')
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const investorName = deal.investor?.name || deal.sharedBy || 'Investor';
  const dealName = deal.deal?.name || deal.opportunityName || 'Unnamed Deal';
  const avatarUrl = deal.investor?.avatar_url || deal.avatar;
  const sectorTag = deal.deal?.sector_tags?.[0] || deal.sector || 'N/A';
  const stageInfo = deal.deal?.stage || deal.stage || 'N/A';
  const fundingAmount = deal.deal?.check_size_required || deal.fundingAmount || 0;
  
  return (
    <div className="border rounded-md p-3 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h4 
          className="font-medium line-clamp-1 cursor-pointer hover:text-primary hover:underline"
          onClick={handleViewDetails}
        >
          {dealName}
        </h4>
        <span className="text-xs text-muted-foreground shrink-0 ml-2">
          {new Date(deal.sharedAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="flex items-center text-sm mb-2 gap-2">
        <Avatar className="h-6 w-6">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={investorName} />}
          <AvatarFallback className="text-xs">{getInitials(investorName)}</AvatarFallback>
        </Avatar>
        <span>Shared by <span className="font-medium">{investorName}</span></span>
      </div>
      
      <div className="flex gap-2 text-xs text-muted-foreground mb-2">
        <span>{sectorTag}</span>
        <span>•</span>
        <span>{stageInfo}</span>
        <span>•</span>
        <span>${formatCurrency(Math.round(fundingAmount))}</span>
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
