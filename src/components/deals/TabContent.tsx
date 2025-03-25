
import { Button } from "@/components/ui/button";
import { Deal } from "@/types";
import { DealList } from "./DealList";
import { SortOption } from "./types";

interface TabContentProps {
  deals: Deal[];
  sortOption: SortOption | null;
  showMatchScore?: boolean;
  emptyStateText: string;
  emptyStateButtonText?: string;
}

export const TabContent = ({ 
  deals, 
  sortOption, 
  showMatchScore = false, 
  emptyStateText,
  emptyStateButtonText
}: TabContentProps) => {
  if (deals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">{emptyStateText}</p>
        {emptyStateButtonText && (
          <Button variant="default" className="mt-4">{emptyStateButtonText}</Button>
        )}
      </div>
    );
  }
  
  return (
    <>
      {sortOption && (
        <p className="text-sm text-muted-foreground">Sorted by: {sortOption.label}</p>
      )}
      <DealList deals={deals} showMatchScore={showMatchScore} />
    </>
  );
};
