import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Opportunity } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  DollarSign, 
  FileText, 
  Globe, 
  MapPin, 
  Tag, 
  ArrowLeft, 
  ThumbsUp, 
  ThumbsDown,
  Download,
  Share,
  Bookmark,
  Users,
  TrendingUp,
  Briefcase,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dealData, setDealData] = useState<(Opportunity & {
    teamSize?: number;
    foundedYear?: number;
    industry?: string;
    businessModel?: string;
    competitors?: string[];
    timeline?: string;
    revenue?: string;
    growth?: string;
    pitchDeckUrl?: string;
    contactEmail?: string;
    projectedIRR?: string;
    personalisedRecommendation?: string;
    team?: { name: string; role: string }[];
    use_of_funds?: { category: string; percentage: number }[];
    milestones?: { description: string; timeline: string }[];
  }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/deals');
      return;
    }

    const fetchDealData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("opportunities")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          toast.error("Deal not found");
          navigate('/deals');
          return;
        }

        const opportunity: any = {
          id: data.id,
          name: data.name,
          description: data.description,
          sector: data.sector,
          stage: data.stage,
          fundingAmount: Number(data.funding_amount),
          location: data.location,
          createdAt: data.created_at,
          pitchDeck: data.pitch_deck,
          
          teamSize: Math.floor(Math.random() * 20) + 3,
          foundedYear: 2018 + Math.floor(Math.random() * 5),
          industry: data.sector,
          businessModel: ["Subscription", "Freemium", "Transaction Fee", "Licensing", "Advertising"][Math.floor(Math.random() * 5)],
          competitors: ["Company A", "Company B", "Company C"].slice(0, Math.floor(Math.random() * 3) + 1),
          timeline: `${Math.floor(Math.random() * 6) + 6} months`,
          revenue: (Math.random() * (data.stage === "Seed" ? 500000 : 5000000)).toFixed(0),
          growth: `${(Math.random() * 200 + 20).toFixed(0)}%`,
          pitchDeckUrl: data.pitch_deck || "https://example.com/pitchdeck.pdf",
          contactEmail: "founder@" + data.name.toLowerCase().replace(/\s/g, "") + ".com",
          projectedIRR: `${(Math.random() * 30 + 15).toFixed(1)}%`,
          personalisedRecommendation: [
            "This opportunity aligns perfectly with your focus on B2B SaaS solutions with strong growth metrics. The founding team has a track record of successful exits in your target sectors.",
            "Based on your investment thesis around fintech infrastructure, this company's innovative approach to financial analytics creates strong synergies with your existing portfolio.",
            "The company's approach to healthcare technology matches your interest in digital health solutions. Their market timing and positioning could provide the returns you're looking for in this sector.",
            "With your stated interest in SaaS companies targeting enterprise customers, this opportunity offers an attractive entry point with its proven traction and reasonable valuation.",
            "This fits your geographical focus and stage preferences. Their business model aligns with your portfolio strategy of investing in recurring revenue businesses with clear paths to profitability."
          ][Math.floor(Math.random() * 5)],
          team: [
            { name: "John Smith", role: "CEO & Co-founder" },
            { name: "Sarah Johnson", role: "CTO & Co-founder" },
            { name: "Michael Brown", role: "Head of Product" },
          ].slice(0, Math.floor(Math.random() * 3) + 1),
          use_of_funds: [
            { category: "Product Development", percentage: Math.floor(Math.random() * 40) + 30 },
            { category: "Marketing", percentage: Math.floor(Math.random() * 30) + 20 },
            { category: "Operations", percentage: Math.floor(Math.random() * 20) + 10 },
            { category: "Other", percentage: Math.floor(Math.random() * 10) + 5 }
          ],
          milestones: [
            { description: "Product Launch", timeline: `Q${Math.floor(Math.random() * 4) + 1} 202${Math.floor(Math.random() * 3) + 3}` },
            { description: "1,000 Customers", timeline: `Q${Math.floor(Math.random() * 4) + 1} 202${Math.floor(Math.random() * 3) + 3}` },
            { description: "$1M ARR", timeline: `Q${Math.floor(Math.random() * 4) + 1} 202${Math.floor(Math.random() * 3) + 4}` }
          ].slice(0, Math.floor(Math.random() * 3) + 1)
        };

        setDealData(opportunity);
      } catch (error) {
        console.error("Error fetching deal details:", error);
        toast.error("Failed to load deal details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealData();
  }, [id, navigate]);

  const formatCurrency = (value: string | number) => {
    if (typeof value === 'string') {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading deal details...</span>
        </div>
      </div>
    );
  }

  if (!dealData) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">Deal Not Found</h2>
          <p className="text-muted-foreground mb-6">The deal you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/deals">Back to Deals</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link to="/deals" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Deals
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{dealData.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{dealData.stage}</Badge>
              <Badge variant="secondary">{dealData.sector}</Badge>
              {dealData.industry && <Badge variant="secondary">{dealData.industry}</Badge>}
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{dealData.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share className="h-4 w-4" />
              Share
            </Button>
            {dealData.pitchDeckUrl && (
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Download Pitch
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{dealData.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Funding Amount</p>
                  <p className="text-lg font-medium">
                    ${(dealData.fundingAmount / 1000000).toFixed(1)}M
                  </p>
                </div>
                {dealData.foundedYear && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <p className="text-lg font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {dealData.foundedYear}
                    </p>
                  </div>
                )}
                {dealData.businessModel && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Business Model</p>
                    <p className="text-lg font-medium flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {dealData.businessModel}
                    </p>
                  </div>
                )}
                {dealData.teamSize && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Team Size</p>
                    <p className="text-lg font-medium flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {dealData.teamSize} employees
                    </p>
                  </div>
                )}
                {dealData.revenue && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Annual Revenue</p>
                    <p className="text-lg font-medium">
                      ${formatCurrency(dealData.revenue)}
                    </p>
                  </div>
                )}
                {dealData.growth && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">YoY Growth</p>
                    <p className="text-lg font-medium flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {dealData.growth}
                    </p>
                  </div>
                )}
                {dealData.projectedIRR && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Projected IRR</p>
                    <p className="text-lg font-medium">
                      {dealData.projectedIRR}
                    </p>
                  </div>
                )}
              </div>
              
              {dealData.competitors && dealData.competitors.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-2">Competitors</p>
                  <div className="flex flex-wrap gap-2">
                    {dealData.competitors.map((competitor, index) => (
                      <Badge key={index} variant="outline">{competitor}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {dealData.personalisedRecommendation && (
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Why We Think You'll Like This</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{dealData.personalisedRecommendation}</p>
              </CardContent>
            </Card>
          )}
          
          {dealData.team && dealData.team.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dealData.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {dealData.use_of_funds && dealData.use_of_funds.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Use of Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dealData.use_of_funds.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{item.category}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {dealData.milestones && dealData.milestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dealData.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{milestone.description}</p>
                        <p className="text-sm text-muted-foreground">{milestone.timeline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          {dealData.matchScore !== undefined && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Compatibility</span>
                    <span className="font-medium">{Math.round(dealData.matchScore * 100)}%</span>
                  </div>
                  <Progress value={dealData.matchScore * 100} className="h-2" />
                  {dealData.matchExplanation && (
                    <p className="text-sm text-muted-foreground mt-2">{dealData.matchExplanation}</p>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      Interested
                    </Button>
                    <Button variant="outline" className="flex-1 gap-1">
                      <ThumbsDown className="h-4 w-4" />
                      Pass
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dealData.contactEmail && (
                  <div className="flex items-center">
                    <span className="w-20 text-sm text-muted-foreground">Email:</span>
                    <a href={`mailto:${dealData.contactEmail}`} className="text-sm hover:underline">
                      {dealData.contactEmail}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="w-20 text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm">{dealData.location}</span>
                </div>
                {dealData.pitchDeckUrl && (
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <FileText className="h-4 w-4" />
                      View Pitch Deck
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Deal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sector</span>
                  <span className="text-sm font-medium">{dealData.sector}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Stage</span>
                  <span className="text-sm font-medium">{dealData.stage}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Funding</span>
                  <span className="text-sm font-medium">${(dealData.fundingAmount / 1000000).toFixed(1)}M</span>
                </div>
                <Separator />
                {dealData.projectedIRR && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Projected IRR</span>
                      <span className="text-sm font-medium">{dealData.projectedIRR}</span>
                    </div>
                    <Separator />
                  </>
                )}
                {dealData.timeline && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Timeline</span>
                      <span className="text-sm font-medium">{dealData.timeline}</span>
                    </div>
                    <Separator />
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Added</span>
                  <span className="text-sm font-medium">
                    {new Date(dealData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DealDetails;
