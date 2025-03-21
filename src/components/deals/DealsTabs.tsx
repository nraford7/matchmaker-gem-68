
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Briefcase, Save, Archive } from "lucide-react";
import { OpportunityList } from "@/components/opportunities";
import { Opportunity } from "@/types";

interface DealsTabsProps {
  activeDeals: Opportunity[];
  savedDeals: Opportunity[];
  pastDeals: Opportunity[];
}

export const DealsTabs = ({ activeDeals, savedDeals, pastDeals }: DealsTabsProps) => {
  return (
    <Tabs defaultValue="active" className="w-full mb-12">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            Active Deals
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            Saved Deals
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-1">
            <Archive className="h-4 w-4" />
            Past Deals
          </TabsTrigger>
        </TabsList>
        
        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <TabsContent value="active" className="space-y-6">
        {activeDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No active deals</p>
            <Button variant="default" className="mt-4">Find Opportunities</Button>
          </div>
        ) : (
          <OpportunityList opportunities={activeDeals} />
        )}
      </TabsContent>
      
      <TabsContent value="saved" className="space-y-6">
        {savedDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No saved deals</p>
            <Button variant="default" className="mt-4">Browse Opportunities</Button>
          </div>
        ) : (
          <OpportunityList opportunities={savedDeals} showMatchScore={true} />
        )}
      </TabsContent>
      
      <TabsContent value="past" className="space-y-6">
        {pastDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No past deals</p>
          </div>
        ) : (
          <OpportunityList opportunities={pastDeals} />
        )}
      </TabsContent>
    </Tabs>
  );
};
