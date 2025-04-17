
import { Deal } from "@/types";
import { ViewAllButton } from "./ViewAllButton";

interface InlineViewAllButtonProps {
  topMatches: Deal[];
}

export const InlineViewAllButton = ({ topMatches }: InlineViewAllButtonProps) => {
  // Only render if we have between 1 and 6 matches
  if (topMatches.length === 0 || topMatches.length > 6) {
    return null;
  }
  
  return <ViewAllButton />;
};
