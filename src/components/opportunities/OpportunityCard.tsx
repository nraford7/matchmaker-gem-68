
import { useState, useEffect } from "react";
import { Deal } from "@/types";
import { Card } from "@/components/ui/card";
import { saveDeal } from "@/services/opportunity/savedDealsServices";
import { submitPositiveFeedback, submitNegativeFeedback, getFeedbackStatus } from "@/services/opportunity/matchFeedbackService";
import { OpportunityCardHeader } from "./OpportunityCardHeader";
import { OpportunityCardContent } from "./OpportunityCardContent";
import { OpportunityCardFooter } from "./OpportunityCardFooter";

interface OpportunityCardProps {
  opportunity: Deal;
  showMatchScore?: boolean;
}

export const OpportunityCard = ({ opportunity, showMatchScore = false }: OpportunityCardProps) => {
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const loadFeedback = async () => {
      if (showMatchScore) {
        const status = await getFeedbackStatus(opportunity.id);
        setFeedback(status);
      }
    };
    
    loadFeedback();
  }, [opportunity.id, showMatchScore]);
  
  const handleSave = async (id: string) => {
    await saveDeal(id);
  };

  const handlePositiveFeedback = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const success = await submitPositiveFeedback(opportunity.id);
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
      const success = await submitNegativeFeedback(opportunity.id);
      if (success) {
        setFeedback(feedback === 'negative' ? null : 'negative');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <OpportunityCardHeader 
        opportunity={opportunity}
        onSave={handleSave}
        activatingId={activatingId}
        completingId={completingId}
        setActivatingId={setActivatingId}
        setCompletingId={setCompletingId}
      />
      
      <OpportunityCardContent 
        opportunity={opportunity}
        showMatchScore={showMatchScore}
      />
      
      <OpportunityCardFooter 
        opportunityId={opportunity.id}
        showMatchScore={showMatchScore}
        feedback={feedback}
        isSubmitting={isSubmitting}
        onPositiveFeedback={handlePositiveFeedback}
        onNegativeFeedback={handleNegativeFeedback}
      />
    </Card>
  );
};
