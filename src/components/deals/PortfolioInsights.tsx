
import { PieChart } from "lucide-react";
import { DealsSummary } from "./DealsSummary";
import { SectorDistribution } from "./SectorDistribution";
import { StatsSummary } from "@/pages/Deals";

interface PortfolioInsightsProps {
  activeStats: StatsSummary;
  savedStats: StatsSummary;
  pastStats: StatsSummary;
  allStats: StatsSummary;
}

export const PortfolioInsights = ({ activeStats, savedStats, pastStats, allStats }: PortfolioInsightsProps) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PieChart className="h-5 w-5" />
        Portfolio Insights
      </h2>
      
      <DealsSummary 
        activeStats={activeStats}
        savedStats={savedStats}
        pastStats={pastStats}
        allStats={allStats}
      />
      
      <SectorDistribution 
        activeStats={activeStats}
        savedStats={savedStats}
        pastStats={pastStats}
      />
    </div>
  );
};
