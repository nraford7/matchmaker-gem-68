
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/OpportunityList";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { mockOpportunities } from "@/data/mockData";
import { NetworkSharedDeals } from "@/components/NetworkSharedDeals";

const Dashboard = () => {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const topMatches = opportunities.filter(o => (o.matchScore || 0) > 0.7);
  
  return (
    <div className="container mx-auto py-6">
      <DashboardHeader />
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          {topMatches.length > 0 ? (
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
      
      <Tabs defaultValue="saved" className="w-full mb-6">
        {/* Removed the TabsList with the button */}
        
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Saved Deals</CardTitle>
              <CardDescription>
                Opportunities you've saved for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  You haven't saved any opportunities yet
                </p>
                <Button variant="outline">Browse Opportunities</Button>
              </div>
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
