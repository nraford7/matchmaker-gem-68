
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Deal } from "@/types";
import { MatchCard } from "./MatchCard";
import { ViewAllButton } from "./ViewAllButton";
import { TopMatchesEmptyState } from "./EmptyState";
import { TopMatchesLoadingState } from "./LoadingState";

interface TopMatchesProps {
  topMatches: Deal[];
  loading?: boolean;
}

export const TopMatches = ({ topMatches, loading }: TopMatchesProps) => {
  if (loading) {
    return <TopMatchesLoadingState />;
  }
  
  if (topMatches.length === 0) {
    return <TopMatchesEmptyState />;
  }
  
  return (
    <Card className="border-none bg-background shadow-none px-0">
      <CardContent className="pt-0 px-0">
        <div className="grid grid-cols-1 gap-6 mb-6">
          {topMatches.slice(0, 6).map((deal) => (
            <MatchCard key={deal.id} deal={deal} />
          ))}
        </div>
        
        {topMatches.length > 0 && topMatches.length <= 6 && <ViewAllButton />}
      </CardContent>
      {topMatches.length > 6 && (
        <CardFooter className="p-3 px-0">
          <ViewAllButton />
        </CardFooter>
      )}
    </Card>
  );
};
