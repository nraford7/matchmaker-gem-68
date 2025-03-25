
import { DashboardHeader } from "@/components/DashboardHeader";
import { TopMatches, PerformanceMetricsSection } from "@/components/dashboard";
import { NetworkHighlights } from "@/components/network/NetworkHighlights";
import { useTopDeals } from "@/hooks/useTopDeals";
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";

const Dashboard = () => {
  const { topMatches, loading } = useTopDeals();
  
  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">The Cartography</h1>
        <p className="text-muted-foreground">
          Your personalized investment landscape—a living atlas of precisely aligned opportunities
        </p>
      </div>
      
      <DashboardHeader />
      
      <div className="grid gap-6 mb-6">
        <TopMatches topMatches={topMatches} loading={loading} />
        
        <NetworkHighlights />
      </div>
      
      <PerformanceMetricsSection />
    </DashboardContainer>
  );
};

export default Dashboard;
