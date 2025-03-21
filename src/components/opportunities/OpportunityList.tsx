
import { Opportunity } from "@/types";
import { OpportunityCard } from "./OpportunityCard";

interface OpportunityListProps {
  opportunities: Opportunity[];
  showMatchScore?: boolean;
}

export const OpportunityList = ({ opportunities, showMatchScore = false }: OpportunityListProps) => {
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No opportunities found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <OpportunityCard 
          key={opportunity.id} 
          opportunity={opportunity} 
          showMatchScore={showMatchScore} 
        />
      ))}
    </div>
  );
};
