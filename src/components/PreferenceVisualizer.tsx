
import { useState, useEffect } from "react";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar,
  Tooltip,
  Legend
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";
import { Investor } from "@/types";

interface PreferenceVisualizerProps {
  investor: Investor;
}

interface RadarData {
  subject: string;
  value: number;
  fullMark: number;
}

export const PreferenceVisualizer = ({ investor }: PreferenceVisualizerProps) => {
  const [data, setData] = useState<RadarData[]>([]);

  useEffect(() => {
    // Generate data for radar chart based on investor preferences
    // Use investor.sector_tags if available, fall back to empty array
    const sectorTags = (investor as any).sector_tags || [];
    
    const radarData: RadarData[] = [
      {
        subject: "Fintech",
        value: sectorTags.includes("Fintech") ? 80 : 20,
        fullMark: 100,
      },
      {
        subject: "Health Tech",
        value: sectorTags.includes("Health Tech") ? 90 : 10,
        fullMark: 100,
      },
      {
        subject: "SaaS",
        value: sectorTags.includes("SaaS") ? 85 : 15,
        fullMark: 100,
      },
      {
        subject: "Early Stage",
        value: investor.preferred_stages?.includes("Seed") || investor.preferred_stages?.includes("Pre-seed") ? 90 : 30,
        fullMark: 100,
      },
      {
        subject: "Growth Stage",
        value: investor.preferred_stages?.includes("Series B") || investor.preferred_stages?.includes("Series C") ? 70 : 20,
        fullMark: 100,
      },
      {
        subject: "US Market",
        value: investor.preferred_geographies?.includes("US") ? 85 : 20,
        fullMark: 100,
      },
      {
        subject: "Europe",
        value: investor.preferred_geographies?.includes("Europe") ? 75 : 30,
        fullMark: 100,
      },
    ];
    
    setData(radarData);
  }, [investor]);

  const chartConfig = {
    investor: { color: "#0ea5e9" },
  };

  return (
    <div className="space-y-6">
      {/* Investment Thesis Card - Moved above the chart */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm font-medium">Investment Thesis</div>
          <p className="text-sm text-muted-foreground mt-2">
            {investor.investment_thesis}
          </p>
        </CardContent>
      </Card>

      {/* Radar Chart with increased height and proper margin */}
      <div className="h-80 mt-6 mb-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar
                name="Investor"
                dataKey="value"
                stroke={chartConfig.investor.color}
                fill={chartConfig.investor.color}
                fillOpacity={0.6}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
