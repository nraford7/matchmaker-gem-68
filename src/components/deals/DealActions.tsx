
import { useState } from "react";
import { Share, BookmarkPlus, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { saveDeal } from "@/services/deal/savedDealsServices";
import { activateDeal } from "@/services/deal/activeDealsServices";
import { shareDealWithInvestor } from "@/services/investor/recommendations/createRecommendation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface DealActionsProps {
  dealId: string;
  dealName: string;
}

const DealActions = ({ dealId, dealName }: DealActionsProps) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [selectedStage, setSelectedStage] = useState("Due Diligence");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSaveDeal = async () => {
    try {
      const success = await saveDeal(dealId);
      if (success) {
        toast.success("Deal saved successfully");
      }
    } catch (error) {
      console.error("Error saving deal:", error);
      toast.error("Failed to save deal");
    }
  };

  const handleShareDeal = async () => {
    setShareDialogOpen(true);
  };

  const handleActivateDeal = async () => {
    setActivateDialogOpen(true);
  };

  const submitShareDeal = async () => {
    if (!recipientEmail.trim()) {
      toast.error("Please enter a recipient email");
      return;
    }

    setIsProcessing(true);
    try {
      // In a real app, we would first lookup the user by email
      // For demo purposes, we're using a hardcoded user ID
      const recipientId = "00000000-0000-0000-0000-000000000000"; // Replace with actual lookup logic
      
      const success = await shareDealWithInvestor(dealId, recipientId, shareMessage);
      if (success) {
        toast.success("Deal shared successfully");
        setShareDialogOpen(false);
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

  const submitActivateDeal = async () => {
    setIsProcessing(true);
    try {
      const success = await activateDeal(dealId, selectedStage);
      if (success) {
        toast.success("Deal added to active deals");
        setActivateDialogOpen(false);
      }
    } catch (error) {
      console.error("Error activating deal:", error);
      toast.error("Failed to add deal to active deals");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleSaveDeal} className="cursor-pointer">
            <BookmarkPlus className="mr-2 h-4 w-4" />
            Save Deal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShareDeal} className="cursor-pointer">
            <Share className="mr-2 h-4 w-4" />
            Share Deal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleActivateDeal} className="cursor-pointer">
            <Briefcase className="mr-2 h-4 w-4" />
            Add to Active Deals
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
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
            <Button type="submit" onClick={submitShareDeal} disabled={isProcessing}>
              {isProcessing ? "Sharing..." : "Share Deal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Activate Dialog */}
      <Dialog open={activateDialogOpen} onOpenChange={setActivateDialogOpen}>
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
            <Button type="submit" onClick={submitActivateDeal} disabled={isProcessing}>
              {isProcessing ? "Adding..." : "Add to Active Deals"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DealActions;
