
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { EnhancedDeal } from "@/types/deal";
import { FileText, ThumbsDown, ThumbsUp } from "lucide-react";

interface DealSidebarProps {
  deal: EnhancedDeal;
}

const DealSidebar = ({ deal }: DealSidebarProps) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const loadFeedback = async () => {
      // In the future we can implement feedback loading here
      setFeedback(null);
    };
    
    loadFeedback();
  }, [deal.id]);
  
  const handlePositiveFeedback = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // In the future we can implement feedback submission here
      setFeedback(feedback === 'positive' ? null : 'positive');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNegativeFeedback = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // In the future we can implement feedback submission here
      setFeedback(feedback === 'negative' ? null : 'negative');
    } finally {
      setIsSubmitting(false);
    }
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
              
              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1 gap-1"
                  variant={feedback === 'positive' ? "default" : "outline"}
                  onClick={handlePositiveFeedback}
                  disabled={isSubmitting}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Interested
                </Button>
                <Button 
                  variant={feedback === 'negative' ? "default" : "outline"} 
                  className="flex-1 gap-1"
                  onClick={handleNegativeFeedback}
                  disabled={isSubmitting}
                >
                  <ThumbsDown className="h-4 w-4" />
                  Pass
                </Button>
              </div>
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
              <span className="text-sm">{deal.geographies?.join(', ') || "Not specified"}</span>
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
                <span className="text-sm font-medium">{deal.sectorTags[0]}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Stage</span>
              <span className="text-sm font-medium">{deal.stage || "Not specified"}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Check Size</span>
              <span className="text-sm font-medium">${deal.checkSizeRequired?.toLocaleString() || "Not specified"}</span>
            </div>
            <Separator />
            {deal.involvementModel && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Involvement</span>
                  <span className="text-sm font-medium">{deal.involvementModel}</span>
                </div>
                <Separator />
              </>
            )}
            {deal.timeHorizon && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Horizon</span>
                  <span className="text-sm font-medium">{deal.timeHorizon}</span>
                </div>
                <Separator />
              </>
            )}
            {deal.projectedIRR && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projected IRR</span>
                <span className="text-sm font-medium">{deal.projectedIRR}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DealSidebar;
