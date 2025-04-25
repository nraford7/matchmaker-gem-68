
import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface AnalysisChecklistProps {
  onComplete: () => void;
}

const analysisSteps = [
  "Customer Problem",
  "Market Size", 
  "Distinctive Solution",
  "Defensible Edge",
  "Proof Points",
  "Business Model", 
  "Go-to-Market",
  "Team",
  "Financials",
  "Ask",
  "Investor ROI"
];

export const AnalysisChecklist: React.FC<AnalysisChecklistProps> = ({ onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < analysisSteps.length) {
        setCompletedSteps(prev => [...prev, currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Small delay before transition
      }
    }, 400); // Check off a new item every 400ms
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="space-y-8 py-4">
      <div>
        <h4 className="text-lg font-medium mb-2">Analyzing Pitch Deck</h4>
        <p className="text-muted-foreground mb-6">
          Our AI is reviewing your pitch deck against key investment criteria...
        </p>
        <div className="space-y-3 animate-fade-in">
          {analysisSteps.map((step, index) => (
            <div 
              key={step}
              className={`flex items-center gap-3 transition-all duration-300 ${
                completedSteps.includes(index) ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className={`
                h-5 w-5 rounded-full flex items-center justify-center border
                ${completedSteps.includes(index) ? 'bg-crimson border-crimson' : 'border-gray-300'}
              `}>
                {completedSteps.includes(index) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
