
import { NetworkInvestor } from "@/types";
import { NetworkTabs } from "./NetworkTabs";
import { SuggestedConnections } from "./SuggestedConnections";

interface NetworkContentProps {
  isLoading: boolean;
  selectedTab: string;
  searchQuery: string;
  filteredInvestors: NetworkInvestor[];
  followedInvestors: NetworkInvestor[];
  suggestedConnections: NetworkInvestor[];
  onTabChange: (value: string) => void;
  onSearchChange: (query: string) => void;
  onToggleFollow: (investorId: string) => void;
}

export const NetworkContent = ({
  isLoading,
  selectedTab,
  searchQuery,
  filteredInvestors,
  followedInvestors,
  suggestedConnections,
  onTabChange,
  onSearchChange,
  onToggleFollow,
}: NetworkContentProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8">
      <div className="lg:w-2/3">
        <NetworkTabs 
          isLoading={isLoading}
          selectedTab={selectedTab}
          searchQuery={searchQuery}
          filteredInvestors={filteredInvestors}
          followedInvestors={followedInvestors}
          onTabChange={onTabChange}
          onSearchChange={onSearchChange}
          onToggleFollow={onToggleFollow}
        />
      </div>
      
      <div className="lg:w-1/3">
        <SuggestedConnections 
          suggestedConnections={suggestedConnections}
          isLoading={isLoading}
          onToggleFollow={onToggleFollow}
        />
      </div>
    </div>
  );
};
