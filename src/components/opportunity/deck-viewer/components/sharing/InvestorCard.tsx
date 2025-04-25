
import React from "react";
import { Button } from "@/components/ui/button";

interface InvestorCardProps {
  investor: {
    id: string;
    name: string;
    company: string;
    match?: string;
    rationale?: string;
  };
  isSelected: boolean;
  onToggle: (investorId: string, e: React.MouseEvent) => void;
  showMatch?: boolean;
}

export const InvestorCard: React.FC<InvestorCardProps> = ({
  investor,
  isSelected,
  onToggle,
  showMatch = false,
}) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
      <div>
        <p className="font-medium">{investor.name}</p>
        <p className="text-sm text-muted-foreground">{investor.company}</p>
        {investor.rationale && (
          <p className="text-xs text-muted-foreground mt-1">{investor.rationale}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {showMatch && investor.match && (
          <span className="text-sm text-green-600">{investor.match} match</span>
        )}
        <Button 
          size="sm" 
          variant={isSelected ? "default" : "outline"}
          onClick={(e) => onToggle(investor.id, e)}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </div>
    </div>
  );
};
