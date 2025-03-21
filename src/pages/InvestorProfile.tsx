
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NetworkInvestor } from "@/types";
import { 
  fetchInvestorById, 
  followInvestor, 
  unfollowInvestor, 
  checkFollowingStatus 
} from "@/services/investor";
import {
  ProfileHeader,
  ProfileAvatar,
  ProfileDetails,
  LoadingState,
  NotFoundState,
  PreferenceCard
} from "@/components/investor";

const InvestorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [investor, setInvestor] = useState<NetworkInvestor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingLoading, setFollowingLoading] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const investorData = await fetchInvestorById(id);
          setInvestor(investorData);
          
          // Check if user is following this investor
          const following = await checkFollowingStatus(id);
          setIsFollowing(following);
        }
      } catch (error) {
        console.error("Error loading investor:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id]);
  
  const handleToggleFollow = async () => {
    if (!id || !investor) return;
    
    setFollowingLoading(true);
    try {
      if (isFollowing) {
        const success = await unfollowInvestor(id);
        if (success) setIsFollowing(false);
      } else {
        const success = await followInvestor(id);
        if (success) setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    } finally {
      setFollowingLoading(false);
    }
  };
  
  const navigateBack = () => navigate("/network");
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!investor) {
    return <NotFoundState navigateBack={navigateBack} />;
  }
  
  // Convert NetworkInvestor to Investor for PreferenceVisualizer
  const investorForVisualizer = {
    id: investor.id,
    name: investor.name,
    email: investor.email || "",
    preferredSectors: investor.sectors,
    preferredStages: investor.preferredStages || [],
    checkSizeMin: investor.checkSizeMin || 0,
    checkSizeMax: investor.checkSizeMax || 0,
    preferredGeographies: investor.preferredGeographies || [],
    investmentThesis: investor.investmentThesis || ""
  };
  
  return (
    <div className="container mx-auto py-6">
      <ProfileHeader navigateBack={navigateBack} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <ProfileAvatar 
                investor={investor}
                isFollowing={isFollowing}
                followingLoading={followingLoading}
                onToggleFollow={handleToggleFollow}
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <ProfileDetails investor={investor} />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <PreferenceCard investor={investorForVisualizer} />
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
