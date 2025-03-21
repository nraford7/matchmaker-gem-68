
import { useState } from "react";
import { Opportunity } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { completeDeal } from "@/services/opportunity/activeDealsServices";

interface CompleteDealDialogProps {
  opportunity: Opportunity;
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
  const [finalAmount, setFinalAmount] = useState<string>(opportunity?.fundingAmount?.toString() || "");

  const handleComplete = async () => {
    if (!finalAmount || isNaN(Number(finalAmount))) {
      return;
    }
    
    const success = await completeDeal(opportunity.id, Number(finalAmount));
    if (success) {
      onComplete();
      setFinalAmount("");
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
            Enter the final investment amount for this deal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Final Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <Input 
                id="amount" 
                className="pl-7" 
                value={finalAmount}
                onChange={(e) => setFinalAmount(e.target.value)}
                type="number"
              />
            </div>
            {finalAmount && isNaN(Number(finalAmount)) && (
              <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3" />
                Please enter a valid number
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleComplete}
            disabled={!finalAmount || isNaN(Number(finalAmount))}
          >
            Complete Deal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
