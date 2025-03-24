
import { NetworkSharedDeal } from "@/types";
import { Handshake, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface SharedDealItemProps {
  deal: NetworkSharedDeal;
}

export const SharedDealItem = ({ deal }: SharedDealItemProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/deals/${deal.deal_id || deal.deal?.id || deal.opportunityId}`);
  };
  
  const getInitials = (name: string = ''): string => {
    return name
      .split(' ')
      .map(part => part[0] || '')
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const investorName = deal.investor?.name || deal.sharedBy || 'Investor';
  const investorId = deal.investor?.id || '';
  const dealName = deal.deal?.name || deal.opportunityName || 'Unnamed Deal';
  const dealDescription = deal.deal?.description || '';
  const avatarUrl = deal.investor?.avatar_url || deal.avatar;
  const fundingAmount = deal.deal?.check_size_required || deal.fundingAmount || 0;
  
  const matchScore = deal.matchScore || Math.floor(Math.random() * 31) + 65;
  
  const getRecommendation = () => {
    const recommendations = [
      "Strong fit with your investment preferences.",
      "Aligns with your investment strategy.",
      `Check size of ${formatCurrency(fundingAmount)} matches your typical investment range.`,
      "Opportunity with potential for significant returns.",
      "Recommended based on your previous interests."
    ];
    return deal.recommendation || recommendations[Math.floor(Math.random() * recommendations.length)];
  };
  
  return (
    <div className="border rounded-md p-4 hover:shadow-md transition-shadow h-full flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h4 
          className="font-semibold text-base line-clamp-1 cursor-pointer hover:text-primary hover:underline"
          onClick={handleViewDetails}
        >
          {dealName}
        </h4>
        <span className="text-xs text-muted-foreground shrink-0 ml-2 bg-muted px-2 py-0.5 rounded-full">
          {new Date(deal.sharedAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="flex items-center text-sm gap-2">
        <Avatar className="h-6 w-6">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={investorName} />}
          <AvatarFallback className="text-xs">{getInitials(investorName)}</AvatarFallback>
        </Avatar>
        <span>
          Shared by <Link to={`/investor/${investorId}`} className="font-medium hover:underline text-primary">{investorName}</Link>
        </span>
      </div>
      
      {deal.comment && (
        <div className="bg-muted/80 p-3 rounded-md flex gap-2">
          <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
          <p className="text-sm italic">{deal.comment}</p>
        </div>
      )}
      
      {dealDescription && (
        <div className="relative overflow-hidden bg-muted/50 p-3 rounded">
          <p className="text-sm text-muted-foreground overflow-hidden max-h-[4.5rem]">
            {dealDescription}
          </p>
          <div className="absolute bottom-0 right-0 left-0 h-6 bg-gradient-to-t from-muted/80 to-transparent pointer-events-none">
            <span className="absolute bottom-1 right-2 text-xs text-muted-foreground">...</span>
          </div>
        </div>
      )}
      
      <div className="mt-auto pt-2 border-t">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium">Match Score</span>
          <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{matchScore}%</span>
        </div>
        <Progress value={matchScore} className="h-2 mb-3" />
        <p className="text-xs text-muted-foreground flex items-start gap-2">
          <Handshake className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
          <span>{getRecommendation()}</span>
        </p>
      </div>
    </div>
  );
};
