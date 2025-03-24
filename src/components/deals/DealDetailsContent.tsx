
import { EnhancedDeal } from "@/types/deal";
import DealOverview from "./DealOverview";
import DealRecommendation from "./DealRecommendation";
import DealTeam from "./DealTeam";
import DealFundsUsage from "./DealFundsUsage";
import DealMilestones from "./DealMilestones";
import DealSidebar from "./DealSidebar";

interface DealDetailsContentProps {
  deal: EnhancedDeal;
}

const DealDetailsContent = ({ deal }: DealDetailsContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <DealOverview deal={deal} />
        
        {deal.recommendation && (
          <DealRecommendation recommendation={deal.recommendation} />
        )}
        
        {deal.team && deal.team.length > 0 && (
          <DealTeam team={deal.team} />
        )}
        
        {deal.use_of_funds && deal.use_of_funds.length > 0 && (
          <DealFundsUsage useOfFunds={deal.use_of_funds} />
        )}
        
        {deal.milestones && deal.milestones.length > 0 && (
          <DealMilestones milestones={deal.milestones} />
        )}
      </div>
      
      <div className="space-y-6">
        <DealSidebar deal={deal} />
      </div>
    </div>
  );
};

export default DealDetailsContent;
