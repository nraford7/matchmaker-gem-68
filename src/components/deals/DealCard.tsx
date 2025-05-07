
import { Card } from "@/components/ui/card";
import { Deal, PrivacyLevel } from "@/types";
import { DealCardHeader } from "./card/DealCardHeader";
import { DealCardContent } from "./card/DealCardContent";
import { DealCardFooter } from "./card/DealCardFooter";
import { PrivacyBadge } from "./PrivacyBadge";
import { anonymizeDeal } from "@/services/deal/anonymizationService";
import { checkDealAccess } from "@/services/deal/interestRegistrationService";
import { useEffect, useState } from "react";

interface DealCardProps {
  deal: Deal;
  showActions?: boolean;
  showMatchScore?: boolean;
  onSave?: (dealId: string) => void;
  onActivate?: (dealId: string) => void;
}

export const DealCard = ({ 
  deal, 
  showActions = true, 
  showMatchScore = false,
  onSave,
  onActivate
}: DealCardProps) => {
  const [hasAccess, setHasAccess] = useState<boolean>(deal.privacyLevel === "OPEN");
  const [processedDeal, setProcessedDeal] = useState<Deal>(deal);
  
  useEffect(() => {
    const checkAccess = async () => {
      if (deal.privacyLevel && deal.privacyLevel !== "OPEN") {
        const { hasAccess: access } = await checkDealAccess(deal.id);
        setHasAccess(access);
        
        // If no access, anonymize the deal
        if (!access) {
          setProcessedDeal(anonymizeDeal(deal, deal.privacyLevel as PrivacyLevel));
        } else {
          setProcessedDeal(deal);
        }
      }
    };

    checkAccess();
  }, [deal]);
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) onSave(deal.id);
  };
  
  const handleActivate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onActivate) onActivate(deal.id);
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30 relative">
      {deal.privacyLevel && deal.privacyLevel !== "OPEN" && (
        <div className="absolute top-2 right-2 z-10">
          <PrivacyBadge privacyLevel={deal.privacyLevel as PrivacyLevel} />
        </div>
      )}
      
      <DealCardHeader deal={processedDeal} />
      <DealCardContent deal={processedDeal} />
      <DealCardFooter 
        showActions={showActions}
        onSave={onSave ? handleSave : undefined}
        onActivate={onActivate ? handleActivate : undefined}
      />
    </Card>
  );
};
