
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Briefcase, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Deal } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { fetchDeals, fetchActiveDeals, fetchSavedDeals, fetchPastDeals } from "@/services/deal";
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

const calculateStats = (deals: Deal[]): StatsSummary => {
  const totalAmount = deals.reduce((sum, deal) => sum + (deal.checkSizeRequired || 0), 0);
  const sectorCount: { [key: string]: number } = {};
  
  deals.forEach(deal => {
    if (deal.sectorTags) {
      deal.sectorTags.forEach(sector => {
        sectorCount[sector] = (sectorCount[sector] || 0) + 1;
      });
    }
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
  const [activeDeals, setActiveDeals] = useState<Deal[]>([]);
  const [savedDeals, setSavedDeals] = useState<Deal[]>([]);
  const [pastDeals, setPastDeals] = useState<Deal[]>([]);
  const [allDeals, setAllDeals] = useState<Deal[]>([]);
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
        console.log("Fetching deals data for user:", user.id);
        
        const [active, saved, past, all] = await Promise.all([
          fetchActiveDeals(),
          fetchSavedDeals(),
          fetchPastDeals(),
          fetchDeals()
        ]);
        
        console.log("Fetched active deals:", active);
        console.log("Fetched saved deals:", saved);
        console.log("Fetched past deals:", past);
        console.log("Fetched all deals:", all);
        
        setActiveDeals(active);
        setSavedDeals(saved);
        setPastDeals(past);
        setAllDeals(all);
        
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
  
  const filteredDeals = allDeals.filter(deal => {
    return searchQuery === "" || 
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.sectorTags || []).some(sector => sector.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  
  if (!user) {
    return (
      <div className="container mx-auto pt-24 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to access the Deals Dashboard</h1>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto pt-24 py-6 px-4 md:px-8 lg:px-16 max-w-7xl">
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
            allDeals={allDeals}
            filteredDeals={filteredDeals}
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
