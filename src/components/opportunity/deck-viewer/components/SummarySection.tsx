
import React from "react";
import { DetailedSummary } from "../DetailedSummary";
import { AnonymousSummary } from "../AnonymousSummary";

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
  
  if (activeTab === "anonymous") {
    return (
      <AnonymousSummary 
        onBack={onBack}
        clarificationResponses={clarificationResponses}
      />
    );
  }
  
  return null;
};
