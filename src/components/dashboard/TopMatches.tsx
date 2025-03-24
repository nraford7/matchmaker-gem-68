
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/opportunities";
import { Award } from "lucide-react";

interface TopMatchesProps {
  topMatches: Opportunity[];
  loading: boolean;
}

export const TopMatches = ({ topMatches, loading }: TopMatchesProps) => {
  const [visibleMatches, setVisibleMatches] = useState<Opportunity[]>([]);

  useEffect(() => {
    if (!loading && topMatches.length > 0) {
      setVisibleMatches(topMatches);
    } else {
      setVisibleMatches([]);
    }
  }, [topMatches, loading]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <CardTitle>Top Matches</CardTitle>
        </div>
        <CardDescription>
          Opportunities that closely match your investment criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-lg text-muted-foreground">
              Loading top matches...
            </p>
          </div>
        ) : visibleMatches.length > 0 ? (
          <div className="opportunities-list">
            <OpportunityList 
              opportunities={visibleMatches}
              showMatchScore
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-lg text-muted-foreground">
              No new matches found based on your criteria
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
