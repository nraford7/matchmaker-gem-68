
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  UserPlus, 
  Search, 
  Handshake,
  MessageSquare,
  Share2,
  ChevronDown,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NetworkSharedDeals } from "@/components/NetworkSharedDeals";
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
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search investors..." 
                    className="pl-10 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <TabsContent value="following" className="mt-0">
                {filteredInvestors.length === 0 && (
                  <Card>
                    <CardContent className="py-10 flex flex-col items-center justify-center text-center">
                      <Users className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No investors found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery ? "No results match your search criteria." : "You're not following any investors yet."}
                      </p>
                      <Button onClick={() => handleTabChange("discover")}>Discover Investors</Button>
                    </CardContent>
                  </Card>
                )}
                
                <div className="grid gap-4">
                  {filteredInvestors.map(investor => (
                    <InvestorCard 
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
                  <Card>
                    <CardContent className="py-10 flex flex-col items-center justify-center text-center">
                      <Search className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No investors found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search to find investors
                      </p>
                      <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                    </CardContent>
                  </Card>
                )}
                
                <div className="grid gap-4">
                  {filteredInvestors.map(investor => (
                    <InvestorCard 
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" />
                Suggested Connections
              </CardTitle>
              <CardDescription>
                Investors you might want to connect with
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : suggestedConnections.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">
                  No more suggested connections available
                </p>
              ) : (
                <div className="space-y-4">
                  {suggestedConnections.map(investor => (
                    <div key={investor.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{investor.name}</p>
                          <p className="text-xs text-muted-foreground">{investor.company}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleFollow(investor.id)}
                      >
                        <UserPlus className="h-3 w-3 mr-1" />
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <NetworkSharedDeals />
        </div>
      </div>
    </div>
  );
};

// Investor card component
interface InvestorCardProps {
  investor: NetworkInvestor;
  isFollowing: boolean;
  onToggleFollow: (id: string) => void;
}

const InvestorCard = ({ investor, isFollowing, onToggleFollow }: InvestorCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/investor/${investor.id}`);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Avatar className="h-14 w-14 cursor-pointer" onClick={handleViewProfile}>
              <AvatarImage src={investor.avatar || undefined} alt={investor.name} />
              <AvatarFallback className="text-lg">{investor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 
                className="font-medium text-lg hover:text-primary cursor-pointer" 
                onClick={handleViewProfile}
              >
                {investor.name}
              </h3>
              <p className="text-muted-foreground">{investor.company}</p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {investor.sectors.map(sector => (
                  <div 
                    key={sector} 
                    className="bg-muted text-xs px-2 py-1 rounded-full"
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Button 
              variant={isFollowing ? "outline" : "default"}
              onClick={() => onToggleFollow(investor.id)}
              className="h-9"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 h-7">
                  Actions
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2" onClick={handleViewProfile}>
                  <Users className="h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">{investor.dealCount}</span> deals in portfolio
          </div>
          <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleViewProfile}>
            View Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Network;
