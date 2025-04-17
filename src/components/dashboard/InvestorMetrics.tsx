
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { fetchFollowedInvestors } from "@/services/investor";
import { NetworkInvestor } from "@/types";
import { Loader2 } from "lucide-react";

export const InvestorMetrics = () => {
  const [investors, setInvestors] = useState<NetworkInvestor[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadInvestors = async () => {
      try {
        const data = await fetchFollowedInvestors();
        setInvestors(data);
      } catch (error) {
        console.error("Error loading investor data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInvestors();
  }, []);
  
  // Calculate sector distribution
  const getSectorDistribution = () => {
    // Flatten all sectors from all investors
    const allSectors = investors.flatMap(investor => (investor as any).sector_tags || []);
    
    // Count occurrences of each sector
    const sectorCounts: Record<string, number> = {};
    allSectors.forEach(sector => {
      if (sectorCounts[sector]) {
        sectorCounts[sector]++;
      } else {
        sectorCounts[sector] = 1;
      }
    });
    
    // Convert to chart data format
    return Object.entries(sectorCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Take top 6 sectors
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  if (loading) {
    return (
      <Card className="col-span-2 bg-background">
        <CardHeader>
          <CardTitle>Network Sector Focus</CardTitle>
          <CardDescription>
            Most common sectors in your investor network
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  const sectorData = getSectorDistribution();
  
  return (
    <Card className="col-span-2 bg-background">
      <CardHeader>
        <CardTitle>Network Sector Focus</CardTitle>
        <CardDescription>
          Most common sectors in your investor network
        </CardDescription>
      </CardHeader>
      <CardContent>
        {investors.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} investors`, 'Focus']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-center">
            <p className="text-muted-foreground">
              Follow investors to see sector distribution
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
