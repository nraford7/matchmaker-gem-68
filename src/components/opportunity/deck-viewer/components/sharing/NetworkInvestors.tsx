
import React from "react";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { InvestorCard } from "./InvestorCard";

interface NetworkInvestorsProps {
  investors: Array<{
    id: string;
    name: string;
    company: string;
  }>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedInvestors: string[];
  onToggleSelection: (investorId: string, e: React.MouseEvent) => void;
}

export const NetworkInvestors: React.FC<NetworkInvestorsProps> = ({
  investors,
  searchQuery,
  onSearchChange,
  selectedInvestors,
  onToggleSelection,
}) => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h5 className="font-medium">Other Investors</h5>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search investors in your network..."
          className="w-full"
        />
        <div className="space-y-3">
          {investors.map(investor => (
            <InvestorCard
              key={investor.id}
              investor={investor}
              isSelected={selectedInvestors.includes(investor.id)}
              onToggle={onToggleSelection}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
