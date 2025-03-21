
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart4, Briefcase, Rocket, Trophy } from "lucide-react";
import { fetchDashboardMetrics } from "@/services/dashboardService";

export const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    newMatches: 0,
    opportunitiesViewed: 0,
    matchQualityPercentage: 0,
    activeDealsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchDashboardMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error loading dashboard metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  // Calculate weekly change (mock data for now)
  const weeklyChanges = {
    newMatches: "+3",
    opportunitiesViewed: "+8",
    matchQualityPercentage: "+2%",
    activeDealsCount: "+1",
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Matches</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : metrics.newMatches}
          </div>
          <p className="text-xs text-muted-foreground">
            {weeklyChanges.newMatches} from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Opportunities Viewed</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : metrics.opportunitiesViewed}
          </div>
          <p className="text-xs text-muted-foreground">
            {weeklyChanges.opportunitiesViewed} from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Match Quality</CardTitle>
          <BarChart4 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : `${metrics.matchQualityPercentage}%`}
          </div>
          <p className="text-xs text-muted-foreground">
            {weeklyChanges.matchQualityPercentage} from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
          <Rocket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : metrics.activeDealsCount}
          </div>
          <p className="text-xs text-muted-foreground">
            {weeklyChanges.activeDealsCount} from last month
          </p>
        </CardContent>
      </Card>
    </>
  );
};
