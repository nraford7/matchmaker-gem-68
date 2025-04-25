
import React, { useState, useEffect } from "react";
import { CircleCheck } from "lucide-react";

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
        onComplete();
      }
    }, 150); // Reduced interval to make animations faster
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="space-y-8 py-4">
      <div>
        <h4 className="text-xl font-medium mb-2">Analyzing Pitch Deck</h4>
        <p className="text-muted-foreground mb-6">
          Our AI is reviewing your pitch deck against key investment criteria...
        </p>
        <div className="space-y-4">
          {analysisSteps.map((step, index) => (
            <div 
              key={step}
              className={`flex items-center gap-4 transition-all duration-100 ${
                completedSteps.includes(index) ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all duration-100
                ${completedSteps.includes(index) 
                  ? 'bg-crimson text-white scale-110' 
                  : 'border border-gray-300 bg-gray-50'}
              `}>
                {completedSteps.includes(index) ? (
                  <CircleCheck 
                    className="h-6 w-6 animate-pulse" 
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                )}
              </div>
              <span className={`
                text-base font-medium transition-colors duration-100
                ${completedSteps.includes(index) ? 'text-foreground' : 'text-muted-foreground'}
              `}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
