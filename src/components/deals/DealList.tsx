
import { Deal } from "@/types";
import { DealCard } from "./DealCard";

interface DealListProps {
  deals: Deal[];
  showMatchScore?: boolean;
  animatingIds?: string[];
  onSaveDeal?: (dealId: string) => void;
  onActivateDeal?: (dealId: string) => void;
}

export const DealList = ({ 
  deals, 
  showMatchScore = false,
  animatingIds = [],
  onSaveDeal,
  onActivateDeal
}: DealListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals.map((deal) => (
        <div
          key={deal.id}
          className={animatingIds.includes(deal.id) ? "animate-fade-out" : ""}
        >
          <DealCard
            deal={deal}
            showMatchScore={showMatchScore}
            onSave={onSaveDeal}
            onActivate={onActivateDeal}
          />
        </div>
      ))}
    </div>
  );
};
