
import { Card } from "@/components/ui/card";
import { Deal } from "@/types";
import { DealCardHeader } from "./card/DealCardHeader";
import { DealCardContent } from "./card/DealCardContent";
import { DealCardFooter } from "./card/DealCardFooter";

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
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30">
      <DealCardHeader deal={deal} />
      <DealCardContent deal={deal} />
      <DealCardFooter 
        showActions={showActions}
        onSave={onSave ? handleSave : undefined}
        onActivate={onActivate ? handleActivate : undefined}
      />
    </Card>
  );
};
