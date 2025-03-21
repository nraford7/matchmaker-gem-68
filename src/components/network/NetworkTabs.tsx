
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkInvestor } from "@/types";
import { NetworkSearchBar } from "./NetworkSearchBar";
import { InvestorList } from "./InvestorList";
import { EmptyState } from "./EmptyState";
import { Loader2 } from "lucide-react";

interface NetworkTabsProps {
  isLoading: boolean;
  selectedTab: string;
  searchQuery: string;
  filteredInvestors: NetworkInvestor[];
  followedInvestors: NetworkInvestor[];
  onTabChange: (value: string) => void;
  onSearchChange: (query: string) => void;
  onToggleFollow: (investorId: string) => void;
}

export const NetworkTabs = ({
  isLoading,
  selectedTab,
  searchQuery,
  filteredInvestors,
  followedInvestors,
  onTabChange,
  onSearchChange,
  onToggleFollow,
}: NetworkTabsProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Tabs defaultValue={selectedTab} onValueChange={onTabChange}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        
        <NetworkSearchBar 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
      </div>
      
      <TabsContent value="following" className="mt-0">
        {filteredInvestors.length === 0 && (
          <EmptyState 
            type={searchQuery ? "search" : "following"}
            searchQuery={searchQuery}
            onClearSearch={() => onSearchChange("")}
            onDiscoverInvestors={() => onTabChange("discover")}
          />
        )}
        
        <InvestorList 
          investors={filteredInvestors} 
          followedInvestors={followedInvestors} 
          onToggleFollow={onToggleFollow} 
        />
      </TabsContent>
      
      <TabsContent value="discover" className="mt-0">
        {filteredInvestors.length === 0 && (
          <EmptyState 
            type="search"
            searchQuery={searchQuery}
            onClearSearch={() => onSearchChange("")}
          />
        )}
        
        <InvestorList 
          investors={filteredInvestors} 
          followedInvestors={followedInvestors} 
          onToggleFollow={onToggleFollow} 
        />
      </TabsContent>
    </Tabs>
  );
};
