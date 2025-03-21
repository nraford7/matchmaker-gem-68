import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/opportunities";
import { Button } from "@/components/ui/button";
import { getFeedbackStatus } from "@/services/opportunity/matchFeedbackService";
import { Award } from "lucide-react";

interface TopMatchesProps {
  topMatches: Opportunity[];
  loading: boolean;
}

export const TopMatches = ({ topMatches, loading }: TopMatchesProps) => {
  const [visibleMatches, setVisibleMatches] = useState<Opportunity[]>([]);
  const [fadingMatchId, setFadingMatchId] = useState<string | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    const handleFeedbackChange = (event: CustomEvent) => {
      const { opportunityId, feedback } = event.detail;
      
      if (feedback === 'negative') {
        const matchIndex = visibleMatches.findIndex(match => match.id === opportunityId);
        
        if (matchIndex !== -1) {
          setFadingMatchId(opportunityId);
          
          setTimeout(() => {
            setVisibleMatches(prev => prev.filter(match => match.id !== opportunityId));
            setFadingMatchId(null);
          }, 500);
        }
      } else if (feedback === 'removed') {
        const match = topMatches.find(match => match.id === opportunityId);
        if (match && !visibleMatches.some(m => m.id === opportunityId)) {
          setVisibleMatches(prev => [...prev, match]);
        }
      }
    };
    
    window.addEventListener('matchFeedbackChanged', handleFeedbackChange as EventListener);
    
    return () => {
      window.removeEventListener('matchFeedbackChanged', handleFeedbackChange as EventListener);
    };
  }, [visibleMatches, topMatches]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <CardTitle>Top Matches</CardTitle>
        </div>
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
