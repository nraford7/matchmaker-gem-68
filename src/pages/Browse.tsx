
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/OpportunityList";
import { mockOpportunities } from "@/data/mockData";

const Browse = () => {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter opportunities based on search
  const filteredOpportunities = opportunities.filter(opp => {
    return searchQuery === "" || 
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.stage.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Browse Opportunities</h1>
        <p className="text-muted-foreground">
          Explore all available investment opportunities
        </p>
      </div>
      
      {/* Search section */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Describe the kind of opportunity you're looking for..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {searchQuery && (
          <Button 
            variant="outline" 
            onClick={() => setSearchQuery("")}
          >
            Clear
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {searchQuery ? "Search Results" : "All Opportunities"}
          </CardTitle>
          <CardDescription>
            {searchQuery 
              ? `Found ${filteredOpportunities.length} result${filteredOpportunities.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : "Browse all available investment opportunities"
            }
            {!searchQuery && filteredOpportunities.length < opportunities.length && (
              <span className="ml-1">
                ({filteredOpportunities.length} of {opportunities.length})
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OpportunityList opportunities={filteredOpportunities} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Browse;
