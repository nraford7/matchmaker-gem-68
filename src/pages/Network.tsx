
import { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MessageSquare,
  Handshake,
  Share2,
  ChevronDown
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

// Mock data for investors
const mockFollowedInvestors = [
  { 
    id: "1", 
    name: "Sarah Johnson", 
    company: "Sequoia Capital", 
    sectors: ["SaaS", "Fintech", "Health Tech"],
    dealCount: 23,
    avatar: null
  },
  { 
    id: "2", 
    name: "Michael Chen", 
    company: "Andreessen Horowitz", 
    sectors: ["AI", "Enterprise", "Developer Tools"],
    dealCount: 18,
    avatar: null
  },
  { 
    id: "3", 
    name: "Elena Rodriguez", 
    company: "First Round Capital", 
    sectors: ["Consumer", "Marketplace", "EdTech"],
    dealCount: 15,
    avatar: null
  }
];

const mockAllInvestors = [
  ...mockFollowedInvestors,
  { 
    id: "4", 
    name: "David Kim", 
    company: "Y Combinator", 
    sectors: ["B2B SaaS", "AI", "Marketplaces"],
    dealCount: 27,
    avatar: null
  },
  { 
    id: "5", 
    name: "Alexandra Wright", 
    company: "Benchmark", 
    sectors: ["Consumer", "SaaS", "Fintech"],
    dealCount: 19,
    avatar: null
  },
  { 
    id: "6", 
    name: "James Smith", 
    company: "Accel", 
    sectors: ["Enterprise SaaS", "Security", "DevOps"],
    dealCount: 22,
    avatar: null
  }
];

const Network = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("following");
  const [investors, setInvestors] = useState(mockFollowedInvestors);
  
  // Toggle following status
  const toggleFollow = (investorId: string) => {
    if (selectedTab === "following") {
      setInvestors(investors.filter(investor => investor.id !== investorId));
    } else {
      const alreadyFollowing = mockFollowedInvestors.some(inv => inv.id === investorId);
      if (alreadyFollowing) {
        // Unfollow
        setInvestors(investors.map(investor => {
          if (investor.id === investorId) {
            return { ...investor, isFollowing: false };
          }
          return investor;
        }));
      } else {
        // Follow
        setInvestors(investors.map(investor => {
          if (investor.id === investorId) {
            return { ...investor, isFollowing: true };
          }
          return investor;
        }));
      }
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    if (value === "following") {
      setInvestors(mockFollowedInvestors);
    } else {
      setInvestors(mockAllInvestors);
    }
  };
  
  // Filter investors based on search query
  const filteredInvestors = investors.filter(
    investor => 
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.sectors.some(sector => 
        sector.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Users className="h-8 w-8" />
                Network
              </h1>
              <p className="text-muted-foreground mt-1">
                Connect with other investors and discover opportunities
              </p>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Investors
            </Button>
          </div>
          
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
                    isFollowing={true}
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
                    isFollowing={mockFollowedInvestors.some(inv => inv.id === investor.id)}
                    onToggleFollow={toggleFollow}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
              <div className="space-y-4">
                {mockAllInvestors.slice(3, 6).map(investor => (
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
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-3 w-3 mr-1" />
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
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
  investor: {
    id: string;
    name: string;
    company: string;
    sectors: string[];
    dealCount: number;
    avatar: string | null;
  };
  isFollowing: boolean;
  onToggleFollow: (id: string) => void;
}

const InvestorCard = ({ investor, isFollowing, onToggleFollow }: InvestorCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg">{investor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium text-lg">{investor.name}</h3>
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
          <Button variant="link" size="sm" className="p-0 h-auto">
            View Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Network;
