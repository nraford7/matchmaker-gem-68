
import { Opportunity } from "@/types";
import { OpportunityCard } from "./OpportunityCard";

interface OpportunityListProps {
  opportunities: Opportunity[];
  showMatchScore?: boolean;
  animatingIds?: string[];
}

export const OpportunityList = ({ 
  opportunities, 
  showMatchScore = false,
  animatingIds = []
}: OpportunityListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {opportunities.map((opportunity) => (
        <div
          key={opportunity.id}
          className={animatingIds.includes(opportunity.id) ? "animate-fade-out" : ""}
        >
          <OpportunityCard
            opportunity={opportunity}
            showMatchScore={showMatchScore}
          />
        </div>
      ))}
    </div>
  );
};
