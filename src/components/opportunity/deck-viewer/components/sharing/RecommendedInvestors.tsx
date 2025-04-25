
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { InvestorCard } from "./InvestorCard";

interface RecommendedInvestorsProps {
  investors: Array<{
    id: string;
    name: string;
    company: string;
    match: string;
    rationale: string;
  }>;
  selectedInvestors: string[];
  onToggleSelection: (investorId: string, e: React.MouseEvent) => void;
}

export const RecommendedInvestors: React.FC<RecommendedInvestorsProps> = ({
  investors,
  selectedInvestors,
  onToggleSelection,
}) => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-muted-foreground" />
          <h5 className="font-medium">Recommended Investors</h5>
        </div>
        <div className="space-y-3">
          {investors.map(investor => (
            <InvestorCard
              key={investor.id}
              investor={investor}
              isSelected={selectedInvestors.includes(investor.id)}
              onToggle={onToggleSelection}
              showMatch
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
