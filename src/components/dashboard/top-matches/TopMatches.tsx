
import { Card, CardContent } from "@/components/ui/card";
import { Deal } from "@/types";
import { TopMatchesEmptyState } from "./EmptyState";
import { TopMatchesLoadingState } from "./LoadingState";
import { MatchCardGrid } from "./MatchCardGrid";
import { MatchesFooter } from "./MatchesFooter";
import { InlineViewAllButton } from "./InlineViewAllButton";

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
        <MatchCardGrid deals={topMatches} />
        <InlineViewAllButton topMatches={topMatches} />
      </CardContent>
      <MatchesFooter topMatches={topMatches} />
    </Card>
  );
};
