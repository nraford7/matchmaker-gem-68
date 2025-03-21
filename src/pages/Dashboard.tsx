
import { useState, useEffect } from "react";
import { Opportunity } from "@/types";
import { DashboardHeader } from "@/components/DashboardHeader";
import { fetchSavedDeals } from "@/services/opportunity";
import { TopMatches, SavedDeals, PerformanceMetricsSection } from "@/components/dashboard";
import { NetworkHighlights } from "@/components/network";

const Dashboard = () => {
  const [topMatches, setTopMatches] = useState<Opportunity[]>([]);
  const [savedDeals, setSavedDeals] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  
  const loadDeals = async () => {
    try {
      // Fetch saved deals which include match scores
      const deals = await fetchSavedDeals();
      setSavedDeals(deals);
      
      // Filter for top matches
      const matches = deals.filter(o => (o.matchScore || 0) > 0.7);
      setTopMatches(matches);
    } catch (error) {
      console.error("Error loading deals:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadDeals();
  }, []);
  
  // Listen for feedback changes to refresh the data
  useEffect(() => {
    const handleFeedbackChange = () => {
      loadDeals();
    };
    
    window.addEventListener('matchFeedbackChanged', handleFeedbackChange as EventListener);
    
    return () => {
      window.removeEventListener('matchFeedbackChanged', handleFeedbackChange as EventListener);
    };
  }, []);
  
  return (
    <div className="container mx-auto py-6">
      <DashboardHeader />
      
      <TopMatches topMatches={topMatches} loading={loading} />
      
      <div className="mb-6">
        <NetworkHighlights />
      </div>
      
      <SavedDeals savedDeals={savedDeals} loading={loading} />
      
      <PerformanceMetricsSection />
    </div>
  );
};

export default Dashboard;
