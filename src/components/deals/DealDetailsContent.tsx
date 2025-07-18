
import { EnhancedDeal } from "@/types/deal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, FileText, Presentation } from "lucide-react";
import DealOverview from "./DealOverview";
import DealTeam from "./DealTeam";
import DealFundsUsage from "./DealFundsUsage";
import DealMilestones from "./DealMilestones";
import DealSidebar from "./DealSidebar";
import DealComments from "./DealComments";
import DealStatus from "./DealStatus";
import DealDeck from "./DealDeck";

interface DealDetailsContentProps {
  deal: EnhancedDeal;
}

const DealDetailsContent = ({ deal }: DealDetailsContentProps) => {
  return (
    <div className="md:col-span-3 mt-6">
      <Tabs defaultValue="deck" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="deck" className="flex items-center gap-1">
            <Presentation className="h-4 w-4" />
            Deck
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Activity & Status
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="deck">
          <DealDeck deal={deal} />
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <DealOverview deal={deal} />
              
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
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DealStatus deal={deal} />
            <DealComments dealId={deal.id} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DealDetailsContent;
