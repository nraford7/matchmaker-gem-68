
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { EnhancedDeal } from "@/types/deal";
import { FileText, TrendingUp } from "lucide-react";

interface DealSidebarProps {
  deal: EnhancedDeal;
}

const DealSidebar = ({ deal }: DealSidebarProps) => {
  // Function to capitalize the first letter of each word
  const capitalize = (text: string) => {
    if (!text) return "";
    return text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      {deal.matchScore !== undefined && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Match Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Compatibility</span>
                <span className="font-medium">{Math.round(deal.matchScore * 100)}%</span>
              </div>
              <Progress value={deal.matchScore * 100} className="h-2" />
              {deal.matchExplanation && (
                <p className="text-sm text-muted-foreground mt-2">{deal.matchExplanation}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {deal.contactEmail && (
              <div className="flex items-center">
                <span className="w-20 text-sm text-muted-foreground">Email:</span>
                <a href={`mailto:${deal.contactEmail}`} className="text-sm hover:underline">
                  {deal.contactEmail}
                </a>
              </div>
            )}
            <div className="flex items-center">
              <span className="w-20 text-sm text-muted-foreground">Location:</span>
              <span className="text-sm">{deal.location || deal.geographies?.join(', ') || "Not specified"}</span>
            </div>
            {deal.pitchDeckUrl && (
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <FileText className="h-4 w-4" />
                  View Pitch Deck
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Deal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {deal.sectorTags && deal.sectorTags.length > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sector</span>
                <span className="text-sm font-medium">{capitalize(deal.sectorTags[0])}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Stage</span>
              <span className="text-sm font-medium">{capitalize(deal.stage || "Not specified")}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Check Size</span>
              <span className="text-sm font-medium">${deal.checkSizeRequired?.toLocaleString() || "Not specified"}</span>
            </div>
            <Separator />
            {deal.IRR !== undefined && deal.IRR !== null && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Projected IRR</span>
                  <span className="text-sm font-medium">{deal.IRR}%</span>
                </div>
                <Separator />
              </>
            )}
            {deal.involvementModel && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Involvement</span>
                  <span className="text-sm font-medium">{capitalize(deal.involvementModel)}</span>
                </div>
                <Separator />
              </>
            )}
            {deal.timeHorizon && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Horizon</span>
                  <span className="text-sm font-medium">{capitalize(deal.timeHorizon)}</span>
                </div>
                <Separator />
              </>
            )}
            {deal.projectedIRR && !deal.IRR && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projected IRR</span>
                <span className="text-sm font-medium">{capitalize(deal.projectedIRR)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DealSidebar;
