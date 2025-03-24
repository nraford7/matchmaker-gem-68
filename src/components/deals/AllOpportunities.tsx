
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Deal } from "@/types";
import { DealList } from "./DealList";
import { DealsSearchBar } from "./DealsSearchBar";

interface AllOpportunitiesProps {
  allDeals: Deal[];
  filteredDeals: Deal[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const AllOpportunities = ({ 
  allDeals, 
  filteredDeals, 
  searchQuery, 
  setSearchQuery 
}: AllOpportunitiesProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          All Deals
        </h2>
        
        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {searchQuery ? "Search Results" : "Available Deals"}
          </CardTitle>
          <CardDescription>
            {searchQuery 
              ? `Found ${filteredDeals.length} result${filteredDeals.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : "Browse all available investment opportunities"
            }
            {!searchQuery && filteredDeals.length < allDeals.length && (
              <span className="ml-1">
                ({filteredDeals.length} of {allDeals.length})
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DealsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          {filteredDeals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No deals found</p>
            </div>
          ) : (
            <DealList deals={filteredDeals} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
