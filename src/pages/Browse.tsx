
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/OpportunityList";
import { mockOpportunities } from "@/data/mockData";

const Browse = () => {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Browse Opportunities</h1>
        <p className="text-muted-foreground">
          Explore all available investment opportunities
        </p>
      </div>
      
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
    </div>
  );
};

export default Browse;
