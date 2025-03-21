
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Briefcase, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { fetchOpportunities, fetchActiveDeals, fetchSavedDeals, fetchPastDeals } from "@/services/opportunityService";
import { 
  DealsTabs, 
  AllOpportunities, 
  PortfolioInsights 
} from "@/components/deals";

// Define the StatsSummary type to share with components
export type StatsSummary = {
  totalCount: number;
  totalAmount: number;
  avgAmount: number;
  topSector: string;
  sectorCount: { [key: string]: number };
};

const calculateStats = (deals: Opportunity[]): StatsSummary => {
  const totalAmount = deals.reduce((sum, deal) => sum + deal.fundingAmount, 0);
  const sectorCount: { [key: string]: number } = {};
  
  deals.forEach(deal => {
    sectorCount[deal.sector] = (sectorCount[deal.sector] || 0) + 1;
  });
  
  const topSector = Object.entries(sectorCount)
    .sort((a, b) => b[1] - a[1])
    .map(([sector]) => sector)[0] || "N/A";
  
  return {
    totalCount: deals.length,
    totalAmount,
    avgAmount: deals.length ? totalAmount / deals.length : 0,
    topSector,
    sectorCount
  };
};

const Deals = () => {
  const { user } = useAuth();
  const [activeDeals, setActiveDeals] = useState<Opportunity[]>([]);
  const [savedDeals, setSavedDeals] = useState<Opportunity[]>([]);
  const [pastDeals, setPastDeals] = useState<Opportunity[]>([]);
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [activeStats, setActiveStats] = useState<StatsSummary>({ totalCount: 0, totalAmount: 0, avgAmount: 0, topSector: "N/A", sectorCount: {} });
  const [savedStats, setSavedStats] = useState<StatsSummary>({ totalCount: 0, totalAmount: 0, avgAmount: 0, topSector: "N/A", sectorCount: {} });
  const [pastStats, setPastStats] = useState<StatsSummary>({ totalCount: 0, totalAmount: 0, avgAmount: 0, topSector: "N/A", sectorCount: {} });
  const [allStats, setAllStats] = useState<StatsSummary>({ totalCount: 0, totalAmount: 0, avgAmount: 0, topSector: "N/A", sectorCount: {} });
  
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const [active, saved, past, all] = await Promise.all([
          fetchActiveDeals(),
          fetchSavedDeals(),
          fetchPastDeals(),
          fetchOpportunities()
        ]);
        
        setActiveDeals(active);
        setSavedDeals(saved);
        setPastDeals(past);
        setAllOpportunities(all);
        
        setActiveStats(calculateStats(active));
        setSavedStats(calculateStats(saved));
        setPastStats(calculateStats(past));
        setAllStats(calculateStats([...active, ...saved, ...past, ...all]));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  const filteredOpportunities = allOpportunities.filter(opp => {
    return searchQuery === "" || 
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.stage.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to access the Deals Dashboard</h1>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            Deals Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your active, saved, and past investment opportunities
          </p>
        </div>
        
        <Link to="/upload">
          <Button className="gap-2">
            <FilePlus className="h-4 w-4" />
            Add a Deal
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your deals...</span>
        </div>
      ) : (
        <>
          <DealsTabs 
            activeDeals={activeDeals} 
            savedDeals={savedDeals}
            pastDeals={pastDeals}
          />

          <AllOpportunities 
            allOpportunities={allOpportunities}
            filteredOpportunities={filteredOpportunities}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <PortfolioInsights 
            activeStats={activeStats}
            savedStats={savedStats}
            pastStats={pastStats}
            allStats={allStats}
          />
        </>
      )}
    </div>
  );
};

export default Deals;
