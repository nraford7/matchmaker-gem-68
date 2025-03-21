
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/opportunities";
import { Button } from "@/components/ui/button";

interface TopMatchesProps {
  topMatches: Opportunity[];
  loading: boolean;
}

export const TopMatches = ({ topMatches, loading }: TopMatchesProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <h2 className="text-xl font-bold">Top Matches</h2>
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
        ) : topMatches.length > 0 ? (
          <OpportunityList 
            opportunities={topMatches}
            showMatchScore
          />
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
