
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/opportunities";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { NetworkSharedDeals } from "@/components/NetworkSharedDeals";
import { fetchSavedDeals } from "@/services/opportunity";

const Dashboard = () => {
  const [topMatches, setTopMatches] = useState<Opportunity[]>([]);
  const [savedDeals, setSavedDeals] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
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
    
    loadDeals();
  }, []);
  
  return (
    <div className="container mx-auto py-6">
      <DashboardHeader />
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold">Top Matches</h2>
          <CardDescription>
            Opportunities that closely match your investment criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-lg text-muted-foreground">
                Loading top matches...
              </p>
            </div>
          ) : topMatches.length > 0 ? (
            <OpportunityList 
              opportunities={topMatches}
              showMatchScore
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-lg text-muted-foreground">
                No new matches found based on your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <NetworkSharedDeals />
      </div>
      
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Your Saved Deals</h2>
        <p className="text-muted-foreground">
          Opportunities you've saved for later
        </p>
      </div>
      
      <Tabs defaultValue="saved" className="w-full mb-6">
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-lg text-muted-foreground">
                    Loading saved deals...
                  </p>
                </div>
              ) : savedDeals.length > 0 ? (
                <OpportunityList opportunities={savedDeals} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-lg text-muted-foreground mb-4">
                    You haven't saved any opportunities yet
                  </p>
                  <Button variant="outline">Browse Opportunities</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Performance Metrics</h2>
        <p className="text-muted-foreground">
          Your investment activity and performance overview
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetrics />
      </div>
    </div>
  );
};

export default Dashboard;
