
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Deal } from "@/types";
import { completeDeal } from "@/services/opportunity";

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
  const [amount, setAmount] = useState<string>(
    opportunity.checkSizeRequired?.toString() || "0"
  );

  const handleComplete = async () => {
    const finalAmount = parseFloat(amount) || 0;
    const success = await completeDeal(opportunity.id, finalAmount);
    if (success) {
      onComplete();
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
            Specify the final amount for this deal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Final Amount</Label>
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000000"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the final investment amount in dollars
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleComplete}>Mark as Completed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
