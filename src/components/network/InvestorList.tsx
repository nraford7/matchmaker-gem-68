
import { NetworkInvestor } from "@/types";
import { NetworkCard } from "./NetworkCard";

interface InvestorListProps {
  investors: NetworkInvestor[];
  followedInvestors: NetworkInvestor[];
  onToggleFollow: (investorId: string) => void;
}

export const InvestorList = ({ 
  investors, 
  followedInvestors, 
  onToggleFollow 
}: InvestorListProps) => {
  return (
    <div className="grid gap-4">
      {investors.map(investor => (
        <NetworkCard 
          key={investor.id} 
          investor={investor} 
          isFollowing={followedInvestors.some(inv => inv.id === investor.id)}
          onToggleFollow={onToggleFollow}
        />
      ))}
    </div>
  );
};
