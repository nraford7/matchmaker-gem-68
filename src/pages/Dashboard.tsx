
import { DashboardHeader } from "@/components/DashboardHeader";
import { TopMatches, PerformanceMetricsSection } from "@/components/dashboard";
import { NetworkHighlights } from "@/components/network/NetworkHighlights";
import { useTopDeals } from "@/hooks/useTopDeals";
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";

const Dashboard = () => {
  const { topMatches, loading } = useTopDeals();
  
  return (
    <DashboardContainer>
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
