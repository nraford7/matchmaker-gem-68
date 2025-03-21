
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import DealHeader from "@/components/deals/DealHeader";
import DealOverview from "@/components/deals/DealOverview";
import DealTeam from "@/components/deals/DealTeam";
import DealFundsUsage from "@/components/deals/DealFundsUsage";
import DealMilestones from "@/components/deals/DealMilestones";
import DealSidebar from "@/components/deals/DealSidebar";
import DealRecommendation from "@/components/deals/DealRecommendation";
import NotFoundState from "@/components/deals/NotFoundState";
import DealLoading from "@/components/deals/DealLoading";
import { fetchDealData } from "@/services/opportunity/dealDetailsService";
import { EnhancedOpportunity } from "@/types/deal";

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dealData, setDealData] = useState<EnhancedOpportunity | null>(null);
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
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={handleGoBack} className="mb-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <DealHeader deal={dealData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <DealOverview deal={dealData} />
          
          {dealData.personalisedRecommendation && (
            <DealRecommendation recommendation={dealData.personalisedRecommendation} />
          )}
          
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
