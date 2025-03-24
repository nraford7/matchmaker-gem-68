
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateRandomInvestors } from "@/services/investor/recommendations";
import { Loader2, UserPlus } from "lucide-react";

export const GenerateInvestorsButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateInvestors = async () => {
    setIsGenerating(true);
    try {
      await generateRandomInvestors();
      // Reload the page to show the new investors
      window.location.reload();
    } catch (error) {
      console.error("Error generating investors:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button 
      onClick={handleGenerateInvestors} 
      disabled={isGenerating}
      variant="outline"
      size="sm"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4 mr-2" />
          Generate 50 Investors
        </>
      )}
    </Button>
  );
};
