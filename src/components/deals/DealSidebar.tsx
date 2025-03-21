
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { EnhancedOpportunity } from "@/types/deal";
import { FileText, ThumbsDown, ThumbsUp } from "lucide-react";
import { submitPositiveFeedback, submitNegativeFeedback, getFeedbackStatus } from "@/services/opportunity/matchFeedbackService";

interface DealSidebarProps {
  deal: EnhancedOpportunity;
}

const DealSidebar = ({ deal }: DealSidebarProps) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const loadFeedback = async () => {
      if (deal.matchScore !== undefined) {
        const status = await getFeedbackStatus(deal.id);
        setFeedback(status);
      }
    };
    
    loadFeedback();
  }, [deal.id, deal.matchScore]);
  
  const handlePositiveFeedback = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const success = await submitPositiveFeedback(deal.id);
      if (success) {
        setFeedback(feedback === 'positive' ? null : 'positive');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNegativeFeedback = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const success = await submitNegativeFeedback(deal.id);
      if (success) {
        setFeedback(feedback === 'negative' ? null : 'negative');
      }
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
              <span className="text-sm">{deal.location}</span>
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
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Sector</span>
              <span className="text-sm font-medium">{deal.sector}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Stage</span>
              <span className="text-sm font-medium">{deal.stage}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Funding</span>
              <span className="text-sm font-medium">${(deal.fundingAmount / 1000000).toFixed(1)}M</span>
            </div>
            <Separator />
            {deal.projectedIRR && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Projected IRR</span>
                  <span className="text-sm font-medium">{deal.projectedIRR}</span>
                </div>
                <Separator />
              </>
            )}
            {deal.timeline && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Timeline</span>
                  <span className="text-sm font-medium">{deal.timeline}</span>
                </div>
                <Separator />
              </>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Added</span>
              <span className="text-sm font-medium">
                {new Date(deal.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DealSidebar;
