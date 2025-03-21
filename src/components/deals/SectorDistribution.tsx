
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";
import { StatsSummary } from "@/pages/Deals";

interface SectorDistributionProps {
  activeStats: StatsSummary;
  savedStats: StatsSummary;
  pastStats: StatsSummary;
}

export const SectorDistribution = ({ activeStats, savedStats, pastStats }: SectorDistributionProps) => {
  const allSectors = { ...activeStats.sectorCount, ...savedStats.sectorCount, ...pastStats.sectorCount };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Sector Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(allSectors).length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No sector data available yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sector</TableHead>
                <TableHead>Active Deals</TableHead>
                <TableHead>Saved Deals</TableHead>
                <TableHead>Past Deals</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(allSectors).map(sector => (
                <TableRow key={sector}>
                  <TableCell className="font-medium">{sector}</TableCell>
                  <TableCell>{activeStats.sectorCount[sector] || 0}</TableCell>
                  <TableCell>{savedStats.sectorCount[sector] || 0}</TableCell>
                  <TableCell>{pastStats.sectorCount[sector] || 0}</TableCell>
                  <TableCell>
                    {(activeStats.sectorCount[sector] || 0) + 
                    (savedStats.sectorCount[sector] || 0) + 
                    (pastStats.sectorCount[sector] || 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
