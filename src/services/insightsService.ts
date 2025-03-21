
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Interface for sector data
export interface SectorData {
  sector: string;
  data: Array<{
    date: string;
    dealCount: number;
    fundingAmount: number;
    avgDealSize: number;
  }>;
}

// Interface for stage data
export interface StageData {
  stage: string;
  dealCount: number;
  fundingAmount: number;
}

// Fetch market insights by sector
export const fetchMarketInsightsBySector = async (): Promise<SectorData[]> => {
  try {
    // Use a more specific type assertion
    const { data, error } = await supabase
      .from('market_insights')
      .select("*")
      .order("date", { ascending: true }) as unknown as {
        data: Array<{
          sector: string;
          date: string;
          deal_count: number;
          funding_amount: number;
          avg_deal_size: number;
        }>;
        error: any;
      };

    if (error) throw error;

    // Group data by sector
    const sectorMap = new Map<string, any[]>();
    
    data.forEach((item) => {
      if (!sectorMap.has(item.sector)) {
        sectorMap.set(item.sector, []);
      }
      
      sectorMap.get(item.sector)?.push({
        date: item.date,
        dealCount: item.deal_count,
        fundingAmount: item.funding_amount,
        avgDealSize: item.avg_deal_size
      });
    });

    // Convert map to array of SectorData
    return Array.from(sectorMap.entries()).map(([sector, data]) => ({
      sector,
      data
    }));
  } catch (error) {
    console.error("Error fetching market insights by sector:", error);
    toast.error("Failed to load market insights");
    return [];
  }
};

// Fetch market insights by stage
export const fetchMarketInsightsByStage = async (): Promise<StageData[]> => {
  try {
    // Use a more specific type assertion
    const { data, error } = await supabase
      .from('market_insights')
      .select("*")
      .order("stage", { ascending: true }) as unknown as {
        data: Array<{
          stage: string;
          deal_count: number;
          funding_amount: number;
        }>;
        error: any;
      };

    if (error) throw error;

    // Group data by stage and aggregate
    const stageMap = new Map<string, { dealCount: number; fundingAmount: number }>();
    
    data.forEach((item) => {
      if (!item.stage) return;
      
      if (!stageMap.has(item.stage)) {
        stageMap.set(item.stage, { dealCount: 0, fundingAmount: 0 });
      }
      
      const stageData = stageMap.get(item.stage)!;
      stageData.dealCount += item.deal_count;
      stageData.fundingAmount += item.funding_amount;
    });

    // Convert map to array of StageData
    return Array.from(stageMap.entries()).map(([stage, data]) => ({
      stage,
      dealCount: data.dealCount,
      fundingAmount: data.fundingAmount
    }));
  } catch (error) {
    console.error("Error fetching market insights by stage:", error);
    toast.error("Failed to load market insights");
    return [];
  }
};

// Fetch recent trends (last 3 months of data)
export const fetchRecentTrends = async (): Promise<any[]> => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    // Use a more specific type assertion
    const { data, error } = await supabase
      .from('market_insights')
      .select("*")
      .gte("date", threeMonthsAgo.toISOString().split('T')[0])
      .order("date", { ascending: true }) as unknown as {
        data: Array<{
          date: string;
          sector: string;
          deal_count: number;
        }>;
        error: any;
      };

    if (error) throw error;

    // Group by month and sector
    const monthSectorMap = new Map<string, any>();
    
    data.forEach((item) => {
      const month = new Date(item.date).toLocaleString('default', { month: 'short' });
      
      if (!monthSectorMap.has(month)) {
        monthSectorMap.set(month, {});
      }
      
      if (!monthSectorMap.get(month)[item.sector]) {
        monthSectorMap.get(month)[item.sector] = 0;
      }
      
      monthSectorMap.get(month)[item.sector] += item.deal_count;
    });

    // Convert map to array of trend data
    return Array.from(monthSectorMap.entries()).map(([month, sectorData]) => ({
      month,
      ...sectorData
    }));
  } catch (error) {
    console.error("Error fetching recent trends:", error);
    toast.error("Failed to load recent trends");
    return [];
  }
};
