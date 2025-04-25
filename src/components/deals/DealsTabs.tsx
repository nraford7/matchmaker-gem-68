import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Upload, Save, Archive } from "lucide-react";
import { Deal } from "@/types";
import { SortDropdown } from "./SortDropdown";
import { TabContent } from "./TabContent";
import { SortOption } from "./types";
import { sortDeals } from "./utils/SortUtils";

interface DealsTabsProps {
  activeDeals: Deal[];
  savedDeals: Deal[];
  pastDeals: Deal[];
  uploadedDeals: Deal[];
}

export const DealsTabs = ({ 
  activeDeals, 
  savedDeals, 
  pastDeals,
  uploadedDeals 
}: DealsTabsProps) => {
  const [sortOption, setSortOption] = useState<SortOption | null>(null);
  
  useEffect(() => {
    console.log('DealsTabs - Active Deals:', activeDeals);
    console.log('DealsTabs - Saved Deals:', savedDeals);
    console.log('DealsTabs - Past Deals:', pastDeals);
    console.log('DealsTabs - Uploaded Deals:', uploadedDeals);
  }, [activeDeals, savedDeals, pastDeals, uploadedDeals]);
  
  const sortedActiveDeals = sortDeals(activeDeals, sortOption);
  const sortedSavedDeals = sortDeals(savedDeals, sortOption);
  const sortedPastDeals = sortDeals(pastDeals, sortOption);
  const sortedUploadedDeals = sortDeals(uploadedDeals, sortOption);
  
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
          <TabsTrigger value="uploaded" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            Your Deals
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-1">
            <Archive className="h-4 w-4" />
            Past Deals
          </TabsTrigger>
        </TabsList>
        
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      
      <TabsContent value="active" className="space-y-6">
        <TabContent 
          deals={sortedActiveDeals} 
          sortOption={sortOption} 
          showMatchScore={true}
          emptyStateText="No active deals"
          emptyStateButtonText="Find Opportunities"
        />
      </TabsContent>
      
      <TabsContent value="saved" className="space-y-6">
        <TabContent 
          deals={sortedSavedDeals} 
          sortOption={sortOption} 
          showMatchScore={true}
          emptyStateText="No saved deals"
          emptyStateButtonText="Browse Opportunities"
        />
      </TabsContent>

      <TabsContent value="uploaded" className="space-y-6">
        <TabContent 
          deals={sortedUploadedDeals} 
          sortOption={sortOption} 
          emptyStateText="You haven't uploaded any deals yet"
          emptyStateButtonText="Upload a Deal"
        />
      </TabsContent>
      
      <TabsContent value="past" className="space-y-6">
        <TabContent 
          deals={sortedPastDeals} 
          sortOption={sortOption} 
          emptyStateText="No past deals"
        />
      </TabsContent>
    </Tabs>
  );
};
