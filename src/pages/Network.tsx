
import { useState, useEffect } from "react";
import { Users, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { NetworkSharedDeals } from "@/components/NetworkSharedDeals";
import { 
  NetworkCard, 
  SuggestedConnections, 
  NetworkSearchBar, 
  EmptyState 
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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Network
            </h1>
            <p className="text-muted-foreground">
              Connect with other investors and discover opportunities
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs defaultValue="following" onValueChange={handleTabChange}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="following">Following</TabsTrigger>
                  <TabsTrigger value="discover">Discover</TabsTrigger>
                </TabsList>
                
                <NetworkSearchBar 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
              
              <TabsContent value="following" className="mt-0">
                {filteredInvestors.length === 0 && (
                  <EmptyState 
                    type={searchQuery ? "search" : "following"}
                    searchQuery={searchQuery}
                    onClearSearch={() => setSearchQuery("")}
                    onDiscoverInvestors={() => handleTabChange("discover")}
                  />
                )}
                
                <div className="grid gap-4">
                  {filteredInvestors.map(investor => (
                    <NetworkCard 
                      key={investor.id} 
                      investor={investor} 
                      isFollowing={followedInvestors.some(inv => inv.id === investor.id)}
                      onToggleFollow={toggleFollow}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="discover" className="mt-0">
                {filteredInvestors.length === 0 && (
                  <EmptyState 
                    type="search"
                    searchQuery={searchQuery}
                    onClearSearch={() => setSearchQuery("")}
                  />
                )}
                
                <div className="grid gap-4">
                  {filteredInvestors.map(investor => (
                    <NetworkCard 
                      key={investor.id} 
                      investor={investor} 
                      isFollowing={followedInvestors.some(inv => inv.id === investor.id)}
                      onToggleFollow={toggleFollow}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        <div className="lg:w-1/3 space-y-6">
          <SuggestedConnections 
            suggestedConnections={suggestedConnections}
            isLoading={isLoading}
            onToggleFollow={toggleFollow}
          />
          
          <NetworkSharedDeals />
        </div>
      </div>
    </div>
  );
};

export default Network;
