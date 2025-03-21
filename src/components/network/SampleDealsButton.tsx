
import { Button } from "@/components/ui/button";
import { createSampleSharedDeals } from "@/services/investor";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const SampleDealsButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateSampleDeals = async () => {
    setIsLoading(true);
    try {
      await createSampleSharedDeals();
      // Reload the page to show the new deals
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={handleCreateSampleDeals} 
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Creating...
        </>
      ) : (
        "Create Sample Shared Deals"
      )}
    </Button>
  );
};
