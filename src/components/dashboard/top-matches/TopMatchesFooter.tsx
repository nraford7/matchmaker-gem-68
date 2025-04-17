
import { CardFooter } from "@/components/ui/card";
import { ViewAllButton } from "./ViewAllButton";

interface TopMatchesFooterProps {
  showViewAll: boolean;
}

export const TopMatchesFooter = ({ showViewAll }: TopMatchesFooterProps) => {
  if (!showViewAll) return null;
  
  return (
    <CardFooter className="p-3 px-0">
      <ViewAllButton />
    </CardFooter>
  );
};
