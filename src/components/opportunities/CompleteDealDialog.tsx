
import { useState } from "react";
import { Deal } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { completeDeal } from "@/services/opportunity/activeDealsServices";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CompleteDealDialogProps {
  opportunity: Deal;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
  trigger: React.ReactNode;
}

export const CompleteDealDialog = ({ 
  opportunity, 
  isOpen, 
  onOpenChange, 
  onComplete, 
  trigger 
}: CompleteDealDialogProps) => {
  const [finalAmount, setFinalAmount] = useState(
    opportunity.checkSizeRequired?.toString() || 
    opportunity.fundingAmount?.toString() || 
    "0"
  );
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const amount = parseFloat(finalAmount);
      if (isNaN(amount)) {
        toast.error("Please enter a valid number");
        return;
      }

      const success = await completeDeal(opportunity.id, amount);
      if (success) {
        onComplete();
        toast.success("Deal marked as completed");
      }
    } catch (error) {
      console.error("Error completing deal:", error);
      toast.error("Failed to complete deal");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Deal</DialogTitle>
          <DialogDescription>
            Mark this deal as completed and move it to your portfolio. 
            This will remove it from your active deals.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="finalAmount">Final Investment Amount</Label>
              <Input
                id="finalAmount"
                placeholder="Enter final amount..."
                value={finalAmount}
                onChange={(e) => setFinalAmount(e.target.value)}
                type="number"
                min="0"
                step="1000"
              />
              <p className="text-sm text-muted-foreground">
                Enter the final investment amount in USD
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Complete Deal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
