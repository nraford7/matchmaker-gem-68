
import React from "react";
import { DetailedSummary } from "../DetailedSummary";

interface SummarySectionProps {
  activeTab: string;
  clarificationResponses: Record<string, string>;
  onBack: () => void;
  onNext: () => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  activeTab,
  clarificationResponses,
  onBack,
  onNext,
}) => {
  if (activeTab === "detailed") {
    return (
      <DetailedSummary 
        onBack={onBack}
        onNext={onNext}
        clarificationResponses={clarificationResponses}
      />
    );
  }
  
  return null;
};
