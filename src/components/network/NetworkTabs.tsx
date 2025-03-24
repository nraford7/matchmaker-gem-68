
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkInvestor } from "@/types";
import { NetworkSearchBar } from "./NetworkSearchBar";
import { InvestorList } from "./InvestorList";
import { EmptyState } from "./EmptyState";
import { Loader2, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Investors</CardTitle>
          </div>
          <CardDescription className="mt-1">
            Connect with investors and discover new opportunities
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue={selectedTab} onValueChange={onTabChange}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
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
      </CardContent>
    </Card>
  );
};
