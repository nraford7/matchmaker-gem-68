
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
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
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-0">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground">Top Matches</CardTitle>
          </div>
          <CardDescription className="mt-1">
            Investment opportunities that match your preferences
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-0">
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
