
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFoundState from "@/components/deals/NotFoundState";
import DealLoading from "@/components/deals/DealLoading";
import { fetchDealData } from "@/services/deal";
import { EnhancedDeal } from "@/types/deal";
import DealDetailsHeader from "@/components/deals/DealDetailsHeader";
import DealDetailsContent from "@/components/deals/DealDetailsContent";
import { DealAccessGate } from "@/components/deals/DealAccessGate";

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
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
      console.log("Deal data in component:", data);
      setDealData(data);
      setIsLoading(false);
    };

    loadDeal();
  }, [id, navigate]);

  // Function to handle going back to the previous page
  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  if (isLoading) {
    return <DealLoading />;
  }

  if (!dealData) {
    return <NotFoundState />;
  }

  return (
    <div className="container mx-auto pt-24 py-6 max-w-6xl">
      <DealDetailsHeader deal={dealData} onGoBack={handleGoBack} />
      
      <DealAccessGate deal={dealData}>
        <DealDetailsContent deal={dealData} />
      </DealAccessGate>
    </div>
  );
};

export default DealDetails;
