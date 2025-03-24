
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DealHeader from "@/components/deals/DealHeader";
import DealOverview from "@/components/deals/DealOverview";
import DealTeam from "@/components/deals/DealTeam";
import DealFundsUsage from "@/components/deals/DealFundsUsage";
import DealMilestones from "@/components/deals/DealMilestones";
import DealSidebar from "@/components/deals/DealSidebar";
import DealRecommendation from "@/components/deals/DealRecommendation";
import NotFoundState from "@/components/deals/NotFoundState";
import DealLoading from "@/components/deals/DealLoading";
import { fetchDealData } from "@/services/deal";
import { EnhancedDeal } from "@/types/deal";
import { formatCurrency } from "@/lib/utils";

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dealData, setDealData] = useState<EnhancedDeal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/deals');
      return;
    }

    const loadDeal = async () => {
      setIsLoading(true);
      const data = await fetchDealData(id);
      setDealData(data);
      setIsLoading(false);
    };

    loadDeal();
  }, [id, navigate]);

  // Function to handle going back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <DealLoading />;
  }

  if (!dealData) {
    return <NotFoundState />;
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <Button variant="ghost" size="sm" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      
      <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{dealData.name}</h1>
              {dealData.matchScore && (
                <Badge variant={dealData.matchScore > 0.8 ? "default" : "outline"} className="ml-2">
                  {Math.round(dealData.matchScore * 100)}% match
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {dealData.sectorTags && dealData.sectorTags.map((sector, index) => (
                <Badge key={index} variant="secondary">
                  {sector}
                </Badge>
              ))}
              
              {dealData.stage && (
                <Badge variant="default">
                  {dealData.stage}
                </Badge>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {dealData.location || dealData.geographies?.join(', ') || "Global"}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {dealData.description}
          </p>
          
          <div className="space-y-3 pt-3 border-t border-border">
            {dealData.checkSizeRequired && (
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground mr-2">Investment Ask:</span>
                <span className="font-medium ml-auto">${formatCurrency(dealData.checkSizeRequired)}</span>
              </div>
            )}
            
            {dealData.IRR !== undefined && dealData.IRR !== null && (
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground mr-2">Estimated IRR:</span>
                <span className="font-medium ml-auto">{dealData.IRR}%</span>
              </div>
            )}
            
            {dealData.timeHorizon && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground mr-2">Estimated Time for Returns:</span>
                <span className="font-medium ml-auto">{dealData.timeHorizon}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {dealData.personalisedRecommendation && (
            <DealRecommendation recommendation={dealData.personalisedRecommendation} />
          )}
          
          <DealOverview deal={dealData} />
          
          {dealData.team && dealData.team.length > 0 && (
            <DealTeam team={dealData.team} />
          )}
          
          {dealData.use_of_funds && dealData.use_of_funds.length > 0 && (
            <DealFundsUsage useOfFunds={dealData.use_of_funds} />
          )}
          
          {dealData.milestones && dealData.milestones.length > 0 && (
            <DealMilestones milestones={dealData.milestones} />
          )}
        </div>
        
        <div className="space-y-6">
          <DealSidebar deal={dealData} />
        </div>
      </div>
    </div>
  );
};

export default DealDetails;
