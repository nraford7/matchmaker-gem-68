
import { Card } from "@/components/ui/card";
import { Deal } from "@/types";
import { TopMatchesEmptyState } from "./EmptyState";
import { TopMatchesLoadingState } from "./LoadingState";
import { TopMatchesHeader } from "./TopMatchesHeader";
import { TopMatchesContent } from "./TopMatchesContent";
import { TopMatchesFooter } from "./TopMatchesFooter";

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
      <TopMatchesHeader />
      <TopMatchesContent topMatches={topMatches} />
      <TopMatchesFooter showViewAll={topMatches.length > 6} />
    </Card>
  );
};
