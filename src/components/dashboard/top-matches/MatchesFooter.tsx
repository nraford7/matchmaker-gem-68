
import { Deal } from "@/types";
import { CardFooter } from "@/components/ui/card";
import { ViewAllButton } from "./ViewAllButton";

interface MatchesFooterProps {
  topMatches: Deal[];
}

export const MatchesFooter = ({ topMatches }: MatchesFooterProps) => {
  // Only render footer if we have more than 6 matches
  if (topMatches.length <= 6) {
    return null;
  }
  
  return (
    <CardFooter className="p-3 px-0">
      <ViewAllButton />
    </CardFooter>
  );
};
