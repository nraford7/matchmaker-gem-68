
import { DashboardMetrics } from "@/components/DashboardMetrics";

export const PerformanceMetricsSection = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Performance Metrics</h2>
        <p className="text-muted-foreground">
          Your investment activity and performance overview
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetrics />
      </div>
    </>
  );
};
