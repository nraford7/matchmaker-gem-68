
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OpportunityList } from "@/components/opportunities";
import { Opportunity } from "@/types";
import { Briefcase, Save, Archive, PieChart, TrendingUp, Filter, Search, Globe, FilePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchOpportunities, fetchActiveDeals, fetchSavedDeals, fetchPastDeals } from "@/services/opportunityService";
import { useAuth } from "@/contexts/AuthContext";

type StatsSummary = {
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
          <Tabs defaultValue="active" className="w-full mb-12">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="active" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Active Deals
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-1">
                  <Save className="h-4 w-4" />
                  Saved Deals
                </TabsTrigger>
                <TabsTrigger value="past" className="flex items-center gap-1">
                  <Archive className="h-4 w-4" />
                  Past Deals
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <TabsContent value="active" className="space-y-6">
              {activeDeals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No active deals</p>
                  <Button variant="default" className="mt-4">Find Opportunities</Button>
                </div>
              ) : (
                <OpportunityList opportunities={activeDeals} />
              )}
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-6">
              {savedDeals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No saved deals</p>
                  <Button variant="default" className="mt-4">Browse Opportunities</Button>
                </div>
              ) : (
                <OpportunityList opportunities={savedDeals} showMatchScore={true} />
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-6">
              {pastDeals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No past deals</p>
                </div>
              ) : (
                <OpportunityList opportunities={pastDeals} />
              )}
            </TabsContent>
          </Tabs>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="h-5 w-5" />
                All Opportunities
              </h2>
              
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {searchQuery ? "Search Results" : "Available Opportunities"}
                </CardTitle>
                <CardDescription>
                  {searchQuery 
                    ? `Found ${filteredOpportunities.length} result${filteredOpportunities.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    : "Browse all available investment opportunities"
                  }
                  {!searchQuery && filteredOpportunities.length < allOpportunities.length && (
                    <span className="ml-1">
                      ({filteredOpportunities.length} of {allOpportunities.length})
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Describe the kind of opportunity you're looking for..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                
                {filteredOpportunities.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No opportunities found</p>
                  </div>
                ) : (
                  <OpportunityList opportunities={filteredOpportunities} />
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Portfolio Insights
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeStats.totalCount}</div>
                  <p className="text-xs text-muted-foreground">
                    ${(activeStats.totalAmount / 1000000).toFixed(1)}M total value
                  </p>
                  {activeStats.totalCount > 0 && (
                    <p className="text-xs mt-1">Top sector: {activeStats.topSector}</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Saved Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{savedStats.totalCount}</div>
                  <p className="text-xs text-muted-foreground">
                    ${(savedStats.totalAmount / 1000000).toFixed(1)}M potential value
                  </p>
                  {savedStats.totalCount > 0 && (
                    <p className="text-xs mt-1">Top sector: {savedStats.topSector}</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Past Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pastStats.totalCount}</div>
                  <p className="text-xs text-muted-foreground">
                    ${(pastStats.totalAmount / 1000000).toFixed(1)}M invested
                  </p>
                  {pastStats.totalCount > 0 && (
                    <p className="text-xs mt-1">Top sector: {pastStats.topSector}</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">All Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{allStats.totalCount}</div>
                  <p className="text-xs text-muted-foreground">
                    ${(allStats.avgAmount / 1000000).toFixed(1)}M avg. deal size
                  </p>
                  {allStats.totalCount > 0 && (
                    <p className="text-xs mt-1">Top sector: {allStats.topSector}</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Sector Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys({...activeStats.sectorCount, ...savedStats.sectorCount, ...pastStats.sectorCount}).length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No sector data available yet</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sector</TableHead>
                        <TableHead>Active Deals</TableHead>
                        <TableHead>Saved Deals</TableHead>
                        <TableHead>Past Deals</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys({...activeStats.sectorCount, ...savedStats.sectorCount, ...pastStats.sectorCount}).map(sector => (
                        <TableRow key={sector}>
                          <TableCell className="font-medium">{sector}</TableCell>
                          <TableCell>{activeStats.sectorCount[sector] || 0}</TableCell>
                          <TableCell>{savedStats.sectorCount[sector] || 0}</TableCell>
                          <TableCell>{pastStats.sectorCount[sector] || 0}</TableCell>
                          <TableCell>
                            {(activeStats.sectorCount[sector] || 0) + 
                            (savedStats.sectorCount[sector] || 0) + 
                            (pastStats.sectorCount[sector] || 0)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Deals;
