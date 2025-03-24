
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { activateDeal } from "@/services/deal/activeDealsServices";

interface ActivateDealDialogProps {
  dealId: string;
  dealName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ActivateDealDialog = ({ dealId, dealName, open, onOpenChange }: ActivateDealDialogProps) => {
  const [selectedStage, setSelectedStage] = useState("Due Diligence");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const success = await activateDeal(dealId, selectedStage);
      if (success) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error activating deal:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Active Deals</DialogTitle>
          <DialogDescription>
            Add "{dealName}" to your active deals
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stage" className="text-right">
              Stage
            </Label>
            <select
              id="stage"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
            >
              <option value="Due Diligence">Due Diligence</option>
              <option value="Term Sheet">Term Sheet</option>
              <option value="Closing">Closing</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isProcessing}>
            {isProcessing ? "Adding..." : "Add to Active Deals"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivateDealDialog;
