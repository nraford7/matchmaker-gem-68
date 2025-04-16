
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchInvestorProfile } from "@/services/investor/recommendations/utils/investorUtils";

interface DealIntroducerProps {
  introducerId: string;
}

export const DealIntroducer = ({ introducerId }: DealIntroducerProps) => {
  const [introducer, setIntroducer] = useState<{ id: string; name: string | null } | null>(null);
  
  useEffect(() => {
    const loadIntroducer = async () => {
      try {
        const profileData = await fetchInvestorProfile(introducerId);
        if (profileData) {
          setIntroducer({
            id: introducerId,
            name: profileData.name
          });
        }
      } catch (error) {
        console.error("Error fetching introducer:", error);
      }
    };
    
    loadIntroducer();
  }, [introducerId]);

  if (!introducer) return null;

  return (
    <div className="text-xs text-muted-foreground">
      Introduced by: <Link to={`/investor/${introducer.id}`} className="font-medium hover:text-primary transition-colors">{introducer.name || "Unknown Investor"}</Link>
    </div>
  );
};
