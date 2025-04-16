
import { DashboardHeader } from "@/components/DashboardHeader";
import { TopMatches, PerformanceMetricsSection } from "@/components/dashboard";
import { NetworkHighlights } from "@/components/network/NetworkHighlights";
import { useTopDeals } from "@/hooks/useTopDeals";
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";

const Dashboard = () => {
  const { topMatches, loading } = useTopDeals();
  
  return (
    <div className="relative bg-background min-h-screen">
      {/* Light theme version of the dashboard */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-foreground/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <DashboardContainer>
        <DashboardHeader />
        
        <div className="grid gap-6 mb-6">
          <TopMatches topMatches={topMatches} loading={loading} />
          
          <NetworkHighlights />
        </div>
        
        <PerformanceMetricsSection />
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;
