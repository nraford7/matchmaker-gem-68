
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsSummary } from "@/pages/Deals";

interface DealsSummaryProps {
  activeStats: StatsSummary;
  savedStats: StatsSummary;
  pastStats: StatsSummary;
  allStats: StatsSummary;
}

export const DealsSummary = ({ activeStats, savedStats, pastStats, allStats }: DealsSummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Active Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{activeStats.totalCount}</div>
          <p className="text-xs text-muted-foreground">
            ${(activeStats.totalAmount / 1000000).toFixed(1)}M total value
          </p>
          {activeStats.totalCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">Top sector: {activeStats.topSector}</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Saved Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{savedStats.totalCount}</div>
          <p className="text-xs text-muted-foreground">
            ${(savedStats.totalAmount / 1000000).toFixed(1)}M potential value
          </p>
          {savedStats.totalCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">Top sector: {savedStats.topSector}</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Past Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{pastStats.totalCount}</div>
          <p className="text-xs text-muted-foreground">
            ${(pastStats.totalAmount / 1000000).toFixed(1)}M invested
          </p>
          {pastStats.totalCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">Top sector: {pastStats.topSector}</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">All Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{allStats.totalCount}</div>
          <p className="text-xs text-muted-foreground">
            ${(allStats.avgAmount / 1000000).toFixed(1)}M avg. deal size
          </p>
          {allStats.totalCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">Top sector: {allStats.topSector}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

