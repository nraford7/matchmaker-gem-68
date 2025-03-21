
import { useState, useEffect } from "react";
import { 
  NetworkHeader,
  NetworkHighlights,
  NetworkContent
} from "@/components/network";
import { NetworkInvestor } from "@/types";
import { 
  fetchAllInvestors, 
  fetchFollowedInvestors, 
  followInvestor, 
  unfollowInvestor 
} from "@/services/investor";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Network = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("following");
  const [investors, setInvestors] = useState<NetworkInvestor[]>([]);
  const [followedInvestors, setFollowedInvestors] = useState<NetworkInvestor[]>([]);
  const [allInvestors, setAllInvestors] = useState<NetworkInvestor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  // Load investors data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [followed, all] = await Promise.all([
          fetchFollowedInvestors(),
          fetchAllInvestors()
        ]);
        
        setFollowedInvestors(followed);
        setAllInvestors(all);
        setInvestors(selectedTab === "following" ? followed : all);
      } catch (error) {
        console.error("Error loading investors:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  // Toggle following status
  const toggleFollow = async (investorId: string) => {
    if (!user) {
      toast.error("Please log in to follow investors");
      return;
    }
    
    const isFollowing = followedInvestors.some(inv => inv.id === investorId);
    
    let success;
    if (isFollowing) {
      // Unfollow
      success = await unfollowInvestor(investorId);
      if (success) {
        setFollowedInvestors(prev => prev.filter(inv => inv.id !== investorId));
      }
    } else {
      // Follow
      success = await followInvestor(investorId);
      if (success) {
        const investorToFollow = allInvestors.find(inv => inv.id === investorId);
        if (investorToFollow) {
          setFollowedInvestors(prev => [...prev, investorToFollow]);
        }
      }
    }
    
    if (success && selectedTab === "following") {
      // Refresh the list if we're on the following tab
      const followed = await fetchFollowedInvestors();
      setFollowedInvestors(followed);
      setInvestors(followed);
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    if (value === "following") {
      setInvestors(followedInvestors);
    } else {
      setInvestors(allInvestors);
    }
  };
  
  // Filter investors based on search query
  const filteredInvestors = investors.filter(
    investor => 
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (investor.company && investor.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      investor.sectors.some(sector => 
        sector.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  
  // Get suggested connections - investors user is not following yet
  const suggestedConnections = allInvestors
    .filter(investor => !followedInvestors.some(followed => followed.id === investor.id))
    .slice(0, 3);
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <NetworkHeader />
        <NetworkHighlights />
      </div>
      
      <NetworkContent 
        isLoading={isLoading}
        selectedTab={selectedTab}
        searchQuery={searchQuery}
        filteredInvestors={filteredInvestors}
        followedInvestors={followedInvestors}
        suggestedConnections={suggestedConnections}
        onTabChange={handleTabChange}
        onSearchChange={setSearchQuery}
        onToggleFollow={toggleFollow}
      />
    </div>
  );
};

export default Network;
