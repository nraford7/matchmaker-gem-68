
import { useState, useEffect } from "react";
import { Share, BookmarkPlus, BookmarkMinus, Briefcase, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { saveDeal, unsaveDeal } from "@/services/deal/savedDealsServices";
import { activateDeal, deactivateDeal } from "@/services/deal/activeDealsServices";
import ShareDealDialog from "./ShareDealDialog";
import ActivateDealDialog from "./ActivateDealDialog";
import { checkDealIsSaved, checkDealIsActive } from "@/services/deal/dealStatusService";

interface DealActionsProps {
  dealId: string;
  dealName: string;
}

const DealActions = ({ dealId, dealName }: DealActionsProps) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDealStatus = async () => {
      setIsLoading(true);
      try {
        const [savedStatus, activeStatus] = await Promise.all([
          checkDealIsSaved(dealId),
          checkDealIsActive(dealId)
        ]);
        
        setIsSaved(savedStatus);
        setIsActive(activeStatus);
      } catch (error) {
        console.error("Error checking deal status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkDealStatus();
  }, [dealId]);

  const handleSaveDeal = async () => {
    try {
      if (isSaved) {
        const success = await unsaveDeal(dealId);
        if (success) {
          setIsSaved(false);
          toast.success("Deal removed from saved deals");
        }
      } else {
        const success = await saveDeal(dealId);
        if (success) {
          setIsSaved(true);
          toast.success("Deal saved successfully");
        }
      }
    } catch (error) {
      console.error("Error toggling save deal:", error);
      toast.error("Failed to update saved status");
    }
    setDropdownOpen(false);
  };

  const handleShareDeal = () => {
    setShareDialogOpen(true);
    setDropdownOpen(false);
  };

  const handleActivateDeal = () => {
    if (!isActive) {
      setActivateDialogOpen(true);
      setDropdownOpen(false);
    } else {
      handleDeactivateDeal();
    }
  };

  const handleDeactivateDeal = async () => {
    try {
      const success = await deactivateDeal(dealId);
      if (success) {
        setIsActive(false);
        toast.success("Deal removed from active deals");
      }
    } catch (error) {
      console.error("Error removing from active deals:", error);
      toast.error("Failed to remove from active deals");
    }
    setDropdownOpen(false);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isLoading}>
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
            {isSaved ? (
              <>
                <BookmarkMinus className="mr-2 h-4 w-4" />
                Unsave Deal
              </>
            ) : (
              <>
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Save Deal
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShareDeal} className="cursor-pointer">
            <Share className="mr-2 h-4 w-4" />
            Share Deal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleActivateDeal} className="cursor-pointer">
            {isActive ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Remove from Active Deals
              </>
            ) : (
              <>
                <Briefcase className="mr-2 h-4 w-4" />
                Add to Active Deals
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ShareDealDialog 
        dealId={dealId}
        dealName={dealName}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
      />

      <ActivateDealDialog 
        dealId={dealId}
        dealName={dealName}
        open={activateDialogOpen}
        onOpenChange={setActivateDialogOpen}
      />
    </>
  );
};

export default DealActions;
