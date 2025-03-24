
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { activateDeal } from "@/services/opportunity";

interface ActivateDealDialogProps {
  opportunityId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onActivate: () => void;
  trigger: React.ReactNode;
}

export const ActivateDealDialog = ({ 
  opportunityId, 
  isOpen, 
  onOpenChange, 
  onActivate, 
  trigger 
}: ActivateDealDialogProps) => {
  const [stage, setStage] = useState<string>("Initial Contact");

  const handleActivate = async () => {
    const success = await activateDeal(opportunityId, stage);
    if (success) {
      onActivate();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Active Deals</DialogTitle>
          <DialogDescription>
            Set initial stage for this deal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="stage">Deal Stage</Label>
            <Select 
              value={stage} 
              onValueChange={setStage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Initial Contact">Initial Contact</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Due Diligence">Due Diligence</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Final Review">Final Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleActivate}>Activate Deal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
