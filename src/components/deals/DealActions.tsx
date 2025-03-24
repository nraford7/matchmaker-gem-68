
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
import ShareDealDialog from "./ShareDealDialog";
import ActivateDealDialog from "./ActivateDealDialog";

interface DealActionsProps {
  dealId: string;
  dealName: string;
}

const DealActions = ({ dealId, dealName }: DealActionsProps) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleShareDeal = () => {
    setShareDialogOpen(true);
    setDropdownOpen(false);
  };

  const handleActivateDeal = () => {
    setActivateDialogOpen(true);
    setDropdownOpen(false);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
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
