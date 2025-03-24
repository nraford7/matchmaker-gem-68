
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { findInvestorByEmail } from "@/services/investor/shared-deals/recipientsService";
import { shareDealWithInvestor } from "@/services/investor/recommendations/createRecommendation";

interface ShareDealDialogProps {
  dealId: string;
  dealName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareDealDialog = ({ dealId, dealName, open, onOpenChange }: ShareDealDialogProps) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!recipientEmail.trim()) {
      toast.error("Please enter a recipient email");
      return;
    }

    setIsProcessing(true);
    try {
      // Find investor by email first
      const investor = await findInvestorByEmail(recipientEmail);
      if (!investor) {
        toast.error("No investor found with this email");
        setIsProcessing(false);
        return;
      }
      
      const success = await shareDealWithInvestor(dealId, investor.id, shareMessage);
      if (success) {
        toast.success("Deal shared successfully");
        onOpenChange(false);
        setRecipientEmail("");
        setShareMessage("");
      }
    } catch (error) {
      console.error("Error sharing deal:", error);
      toast.error("Failed to share deal");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Deal</DialogTitle>
          <DialogDescription>
            Share "{dealName}" with another investor
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipient" className="text-right">
              Recipient
            </Label>
            <Input
              id="recipient"
              placeholder="investor@example.com"
              className="col-span-3"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Check out this deal I found..."
              className="col-span-3"
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isProcessing}>
            {isProcessing ? "Sharing..." : "Share Deal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDealDialog;
