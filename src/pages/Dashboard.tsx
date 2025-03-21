
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/OpportunityList";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { mockOpportunities } from "@/data/mockData";

const Dashboard = () => {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const topMatches = opportunities.filter(o => (o.matchScore || 0) > 0.7);
  
  return (
    <div className="container mx-auto py-6">
      <DashboardHeader />
      
      {/* New Match Alerts section moved to the very top, before metrics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>New Match Alerts</CardTitle>
          <CardDescription>
            Opportunities that best match your investment criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
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
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <DashboardMetrics />
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Opportunities</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Opportunities</CardTitle>
              <CardDescription>
                Browse all available investment opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunityList opportunities={opportunities} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Opportunities</CardTitle>
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
    </div>
  );
};

export default Dashboard;
