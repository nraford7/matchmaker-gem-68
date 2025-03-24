
import { useState, useEffect } from "react";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { Card, CardContent } from "@/components/ui/card";
import { fetchCurrentInvestorProfile } from "@/services/investor";
import { Investor } from "@/types";
import { Loader2, DollarSign, TrendingUp, Globe, Users } from "lucide-react";

export const PerformanceMetricsSection = () => {
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadInvestorProfile = async () => {
      try {
        const profile = await fetchCurrentInvestorProfile();
        setInvestor(profile);
      } catch (error) {
        console.error("Error loading investor profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInvestorProfile();
  }, []);

  const renderMetricCard = (title: string, value: string | number, icon: React.ReactNode, description: string) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium tracking-tight">{title}</h3>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="mb-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Performance Metrics</h2>
          <p className="text-muted-foreground">
            Your investment activity and performance overview
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Performance Metrics</h2>
        <p className="text-muted-foreground">
          Your investment activity and performance overview
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {investor ? (
          <>
            {renderMetricCard(
              "Investment Range", 
              `$${(investor.checkSizeMin / 1000).toFixed(0)}K - $${(investor.checkSizeMax / 1000).toFixed(0)}K`, 
              <DollarSign className="h-4 w-4" />, 
              "Your preferred investment size"
            )}
            
            {renderMetricCard(
              "Sectors", 
              investor.contextSectors.length, 
              <TrendingUp className="h-4 w-4" />, 
              "Number of sectors in your portfolio"
            )}
            
            {renderMetricCard(
              "Geographic Focus", 
              investor.preferredGeographies.length, 
              <Globe className="h-4 w-4" />, 
              "Number of focus regions"
            )}
            
            {renderMetricCard(
              "Network", 
              "250+", 
              <Users className="h-4 w-4" />, 
              "Investors in your extended network"
            )}
          </>
        ) : (
          <DashboardMetrics />
        )}
      </div>
    </>
  );
};
