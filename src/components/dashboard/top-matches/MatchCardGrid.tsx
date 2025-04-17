
import { Deal } from "@/types";
import { MatchCard } from "./MatchCard";

interface MatchCardGridProps {
  deals: Deal[];
}

export const MatchCardGrid = ({ deals }: MatchCardGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6">
      {deals.slice(0, 6).map((deal) => (
        <MatchCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};
