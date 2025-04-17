
import { CardContent } from "@/components/ui/card";
import { Deal } from "@/types";
import { MatchCard } from "./MatchCard";
import { ViewAllButton } from "./ViewAllButton";

interface TopMatchesContentProps {
  topMatches: Deal[];
}

export const TopMatchesContent = ({ topMatches }: TopMatchesContentProps) => {
  return (
    <CardContent className="pt-4 px-0">
      <div className="grid grid-cols-1 gap-6 mb-6">
        {topMatches.slice(0, 6).map((deal) => (
          <MatchCard key={deal.id} deal={deal} />
        ))}
      </div>
      
      {topMatches.length > 0 && topMatches.length <= 6 && <ViewAllButton />}
    </CardContent>
  );
};
