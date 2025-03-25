
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Deal } from "@/types";
import { MatchCard } from "./MatchCard";
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
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Top Matches</CardTitle>
          </div>
          <CardDescription className="mt-1">
            Investment opportunities that match your preferences
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {topMatches.slice(0, 6).map((deal) => (
            <MatchCard key={deal.id} deal={deal} />
          ))}
        </div>
        
        {topMatches.length > 0 && topMatches.length <= 6 && (
          <Link to="/deals" className="w-full">
            <Button variant="outline" className="w-full group">
              <span>View All Matches</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </CardContent>
      {topMatches.length > 6 && (
        <CardFooter className="p-3">
          <Link to="/deals" className="w-full">
            <Button variant="outline" className="w-full group">
              <span>View All Matches</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};
