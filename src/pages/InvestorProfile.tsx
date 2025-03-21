import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Briefcase, 
  Building, 
  Mail, 
  MapPin,
  DollarSign,
  Tag,
  Clock,
  Loader2,
  UserPlus,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NetworkInvestor } from "@/types";
import { PreferenceVisualizer } from "@/components/PreferenceVisualizer";
import { 
  fetchInvestorById, 
  followInvestor, 
  unfollowInvestor, 
  checkFollowingStatus 
} from "@/services/investor";

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
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!investor) {
    return (
      <div className="container mx-auto py-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Investor not found</h1>
        <Button onClick={() => navigate("/network")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Network
        </Button>
      </div>
    );
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
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate("/network")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Network
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={investor.avatar || undefined} alt={investor.name} />
                <AvatarFallback className="text-xl">{investor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle>{investor.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Building className="h-3.5 w-3.5 mr-1" />
                  {investor.company}
                </CardDescription>
              </div>
              <Button 
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                onClick={handleToggleFollow}
                disabled={followingLoading}
                className="shrink-0"
              >
                {followingLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isFollowing ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Follow
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {investor.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{investor.email}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm">
                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{investor.dealCount} deals in portfolio</span>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                  Sectors
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
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
              
              {investor.preferredStages && investor.preferredStages.length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    Preferred Stages
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {investor.preferredStages.map(stage => (
                      <div 
                        key={stage} 
                        className="bg-muted text-xs px-2 py-1 rounded-full"
                      >
                        {stage}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {investor.preferredGeographies && investor.preferredGeographies.length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    Geographic Focus
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {investor.preferredGeographies.map(geo => (
                      <div 
                        key={geo} 
                        className="bg-muted text-xs px-2 py-1 rounded-full"
                      >
                        {geo}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {investor.checkSizeMin !== undefined && investor.checkSizeMax !== undefined && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    Check Size
                  </h3>
                  <p className="text-sm">
                    ${(investor.checkSizeMin/1000).toFixed(0)}K - ${(investor.checkSizeMax/1000).toFixed(0)}K
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
              <CardDescription>
                Visual representation of {investor.name}'s investment criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreferenceVisualizer investor={investorForVisualizer} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
