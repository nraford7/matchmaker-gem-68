import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/opportunities";
import { Button } from "@/components/ui/button";
import { getFeedbackStatus } from "@/services/opportunity/matchFeedbackService";

interface TopMatchesProps {
  topMatches: Opportunity[];
  loading: boolean;
}

export const TopMatches = ({ topMatches, loading }: TopMatchesProps) => {
  const [visibleMatches, setVisibleMatches] = useState<Opportunity[]>([]);
  const [fadingMatchId, setFadingMatchId] = useState<string | null>(null);

  useEffect(() => {
    // Filter out opportunities that have negative feedback
    const checkMatchFeedback = async () => {
      const updatedMatches = [...topMatches];
      
      for (let i = 0; i < updatedMatches.length; i++) {
        const status = await getFeedbackStatus(updatedMatches[i].id);
        if (status === 'negative') {
          updatedMatches.splice(i, 1);
          i--; // Adjust index after removal
        }
      }
      
      setVisibleMatches(updatedMatches);
    };
    
    if (!loading && topMatches.length > 0) {
      checkMatchFeedback();
    } else {
      setVisibleMatches([]);
    }
  }, [topMatches, loading]);

  // Setup a listener for feedback changes
  useEffect(() => {
    const handleFeedbackChange = (event: CustomEvent) => {
      const { opportunityId, feedback } = event.detail;
      
      if (feedback === 'negative') {
        // Find the opportunity in our visible matches
        const matchIndex = visibleMatches.findIndex(match => match.id === opportunityId);
        
        if (matchIndex !== -1) {
          // Trigger the fade animation
          setFadingMatchId(opportunityId);
          
          // Remove after animation completes
          setTimeout(() => {
            setVisibleMatches(prev => prev.filter(match => match.id !== opportunityId));
            setFadingMatchId(null);
          }, 500); // Match the CSS transition duration
        }
      } else if (feedback === 'removed') {
        // If feedback was removed, we need to check if it was previously negative
        // If so, we should add the match back to the list if it's in topMatches
        const match = topMatches.find(match => match.id === opportunityId);
        if (match && !visibleMatches.some(m => m.id === opportunityId)) {
          setVisibleMatches(prev => [...prev, match]);
        }
      }
    };
    
    // Add event listener for custom feedback events
    window.addEventListener('matchFeedbackChanged', handleFeedbackChange as EventListener);
    
    return () => {
      window.removeEventListener('matchFeedbackChanged', handleFeedbackChange as EventListener);
    };
  }, [visibleMatches, topMatches]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <h2 className="text-xl font-bold">Top Matches</h2>
        <CardDescription>
          Opportunities that closely match your investment criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-lg text-muted-foreground">
              Loading top matches...
            </p>
          </div>
        ) : visibleMatches.length > 0 ? (
          <div className="opportunities-list">
            <OpportunityList 
              opportunities={visibleMatches}
              showMatchScore
              animatingIds={fadingMatchId ? [fadingMatchId] : []}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-lg text-muted-foreground">
              No new matches found based on your criteria
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
