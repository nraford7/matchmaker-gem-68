
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedDeal } from "@/types/deal";
import { Lightbulb, Percent, ThumbsUp, ThumbsDown } from "lucide-react";
import DealRecommendation from "./DealRecommendation";

interface DealRecommendationsProps {
  deal: EnhancedDeal;
}

const DealRecommendations = ({ deal }: DealRecommendationsProps) => {
  // In case matchScore isn't provided, use a default value (75% for demo purposes)
  const matchScore = deal.matchScore !== undefined ? deal.matchScore : 0.75;
  const isGoodMatch = matchScore >= 0.7;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" />
            Investor Fit Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center p-6 bg-muted/20 rounded-lg">
            <div className="relative h-32 w-32 flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full border-8 border-muted-foreground/10"></div>
              <div 
                className={`absolute inset-0 rounded-full border-8 border-l-transparent border-b-transparent border-r-transparent ${isGoodMatch ? 'border-t-primary' : 'border-t-destructive'}`}
                style={{ transform: `rotate(${Math.round(matchScore * 360)}deg)` }}
              ></div>
              <div className="text-3xl font-bold">{Math.round(matchScore * 100)}%</div>
            </div>
            <h3 className="text-xl font-semibold">
              {isGoodMatch ? 'Good Match' : 'Potential Mismatch'}
            </h3>
            <p className="text-muted-foreground text-center mt-1">
              Based on your investment profile
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                  Alignment Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li className="text-sm">
                    {deal.stage && `Investment stage (${deal.stage}) matches your preferences`}
                  </li>
                  <li className="text-sm">
                    {deal.sectorTags && deal.sectorTags.length > 0 && 
                      `Industry focus (${deal.sectorTags[0]}) aligns with your interests`}
                  </li>
                  <li className="text-sm">
                    {deal.timeHorizon && 
                      `Time horizon (${deal.timeHorizon}) fits your investment timeline`}
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ThumbsDown className="h-4 w-4 mr-2 text-orange-500" />
                  Consideration Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li className="text-sm">
                    {deal.checkSizeRequired && 
                      `Required investment (${deal.checkSizeRequired}) may be outside your range`}
                  </li>
                  <li className="text-sm">
                    {deal.IRR && 
                      `Expected IRR (${deal.IRR}%) may not meet your return expectations`}
                  </li>
                  <li className="text-sm">
                    {deal.geographies && deal.geographies.length > 0 && 
                      `Geographic focus (${deal.geographies.join(', ')}) may be outside your target regions`}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Use the existing DealRecommendation component */}
          <DealRecommendation recommendation={deal.recommendation || ""} />
          
          <div className="mt-4 p-4 bg-muted/20 rounded-lg">
            <h4 className="font-medium mb-2">Next Steps</h4>
            <p className="text-sm text-muted-foreground">
              {isGoodMatch 
                ? "We recommend exploring this opportunity further. Schedule a meeting with the team to discuss potential terms." 
                : "Consider reviewing more details about this opportunity before making a decision."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealRecommendations;
