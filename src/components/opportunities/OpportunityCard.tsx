import { useState } from "react";
import { Deal } from "@/types";
import { Card } from "@/components/ui/card";
import { saveDeal } from "@/services/opportunity/savedDealsServices";
import { OpportunityCardHeader } from "./OpportunityCardHeader";
import { OpportunityCardContent } from "./OpportunityCardContent";
import { OpportunityCardFooter } from "./OpportunityCardFooter";

interface OpportunityCardProps {
  opportunity: Deal;
  showMatchScore?: boolean;
}

export const OpportunityCard = ({ opportunity, showMatchScore = false }: OpportunityCardProps) => {
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);
  
  const handleSave = async (id: string) => {
    await saveDeal(id);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30">
      <OpportunityCardHeader 
        opportunity={opportunity}
        onSave={handleSave}
        activatingId={activatingId}
        completingId={completingId}
        setActivatingId={setActivatingId}
        setCompletingId={setCompletingId}
      />
      
      <OpportunityCardContent 
        opportunity={opportunity}
        showMatchScore={showMatchScore}
      />
      
      <OpportunityCardFooter 
        opportunityId={opportunity.id}
        showMatchScore={showMatchScore}
      />
    </Card>
  );
};

