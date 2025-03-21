
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
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NetworkInvestor } from "@/types";
import { PreferenceVisualizer } from "@/components/PreferenceVisualizer";

// Enhanced mock data for investors with complete profiles
const mockInvestorProfiles: NetworkInvestor[] = [
  { 
    id: "1", 
    name: "Sarah Johnson", 
    company: "Sequoia Capital", 
    sectors: ["SaaS", "Fintech", "Health Tech"],
    dealCount: 23,
    avatar: null,
    email: "sarah@sequoiacap.com",
    preferredStages: ["Seed", "Series A", "Series B"],
    checkSizeMin: 750000,
    checkSizeMax: 3000000,
    preferredGeographies: ["US", "Canada", "Europe"],
    investmentThesis: "Focused on backing exceptional founders building category-defining technology companies with strong network effects. Looking for innovative solutions in financial technology, enterprise SaaS, and digital health."
  },
  { 
    id: "2", 
    name: "Michael Chen", 
    company: "Andreessen Horowitz", 
    sectors: ["AI", "Enterprise", "Developer Tools"],
    dealCount: 18,
    avatar: null,
    email: "michael@a16z.com",
    preferredStages: ["Series A", "Series B"],
    checkSizeMin: 1000000,
    checkSizeMax: 5000000,
    preferredGeographies: ["US", "Asia", "Europe"],
    investmentThesis: "Investing in companies leveraging artificial intelligence to transform industries. Especially interested in developer tools, enterprise software, and AI infrastructure with clear paths to market leadership."
  },
  { 
    id: "3", 
    name: "Elena Rodriguez", 
    company: "First Round Capital", 
    sectors: ["Consumer", "Marketplace", "EdTech"],
    dealCount: 15,
    avatar: null,
    email: "elena@firstround.com",
    preferredStages: ["Pre-seed", "Seed"],
    checkSizeMin: 250000,
    checkSizeMax: 1000000,
    preferredGeographies: ["US", "Latin America"],
    investmentThesis: "Supporting founders at the earliest stages with a focus on consumer products, marketplace models, and education technology. Looking for passionate teams with unique insights into their target markets."
  },
  { 
    id: "4", 
    name: "David Kim", 
    company: "Y Combinator", 
    sectors: ["B2B SaaS", "AI", "Marketplaces"],
    dealCount: 27,
    avatar: null,
    email: "david@ycombinator.com",
    preferredStages: ["Pre-seed", "Seed"],
    checkSizeMin: 150000,
    checkSizeMax: 500000,
    preferredGeographies: ["US", "Canada", "Europe", "Asia"],
    investmentThesis: "Investing in early-stage startups with exceptional founding teams. Focus on rapid growth potential, clear value propositions, and scalable business models across various technology sectors."
  },
  { 
    id: "5", 
    name: "Alexandra Wright", 
    company: "Benchmark", 
    sectors: ["Consumer", "SaaS", "Fintech"],
    dealCount: 19,
    avatar: null,
    email: "alexandra@benchmark.com",
    preferredStages: ["Seed", "Series A"],
    checkSizeMin: 500000,
    checkSizeMax: 2500000,
    preferredGeographies: ["US", "UK"],
    investmentThesis: "Seeking category-defining consumer and enterprise companies led by visionary founders. Interested in novel approaches to established markets with strong defensibility and network effects."
  },
  { 
    id: "6", 
    name: "James Smith", 
    company: "Accel", 
    sectors: ["Enterprise SaaS", "Security", "DevOps"],
    dealCount: 22,
    avatar: null,
    email: "james@accel.com",
    preferredStages: ["Series A", "Series B", "Series C"],
    checkSizeMin: 2000000,
    checkSizeMax: 10000000,
    preferredGeographies: ["US", "Europe", "Australia"],
    investmentThesis: "Backing entrepreneurs building transformative enterprise software companies. Focus on security, infrastructure, and developer tools that address large, growing markets with differentiated technology."
  }
];

const InvestorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [investor, setInvestor] = useState<NetworkInvestor | null>(null);
  
  useEffect(() => {
    // Find investor by ID
    const foundInvestor = mockInvestorProfiles.find(i => i.id === id);
    if (foundInvestor) {
      setInvestor(foundInvestor);
    }
  }, [id]);
  
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
                <AvatarFallback className="text-xl">{investor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{investor.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Building className="h-3.5 w-3.5 mr-1" />
                  {investor.company}
                </CardDescription>
              </div>
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
