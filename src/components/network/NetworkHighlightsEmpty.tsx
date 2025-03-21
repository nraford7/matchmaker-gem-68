import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createSampleSharedDeals } from "@/services/investor";
import { toast } from "sonner";
interface NetworkHighlightsEmptyProps {
  onReloadDeals: () => Promise<void>;
}
export const NetworkHighlightsEmpty = ({
  onReloadDeals
}: NetworkHighlightsEmptyProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const handleCreateSample = async () => {
    setIsCreating(true);
    try {
      const success = await createSampleSharedDeals();
      if (success) {
        toast.success("Sample deals created successfully");
        // Reload shared deals after creating samples
        await onReloadDeals();
      }
    } catch (error) {
      console.error("Error creating sample deals:", error);
    } finally {
      setIsCreating(false);
    }
  };
  return <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Highlights</CardTitle>
        </div>
        <CardDescription>
          Deals shared by investors in your network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            No shared deals from your network yet
          </p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full">Find Investors to Follow</Button>
            <Button variant="default" className="w-full" onClick={handleCreateSample} disabled={isCreating}>
              {isCreating ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </> : "Create Sample Shared Deals"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
};