
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Deal } from "@/types";
import { DealList } from "./DealList";
import { DealsSearchBar } from "./DealsSearchBar";
import { useState } from "react";
import { DealsHeader } from "./DealsHeader";
import { Pagination } from "./Pagination";
import { SortOption } from "./types";
import { sortDeals } from "./utils/SortUtils";

interface AllOpportunitiesProps {
  allDeals: Deal[];
  filteredDeals: Deal[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Number of deals to show per page
const DEALS_PER_PAGE = 20;

export const AllOpportunities = ({ 
  allDeals, 
  filteredDeals, 
  searchQuery, 
  setSearchQuery 
}: AllOpportunitiesProps) => {
  const [sortOption, setSortOption] = useState<SortOption | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sort deals based on the selected option
  const sortedDeals = sortDeals(filteredDeals, sortOption);
  
  // Calculate total number of pages
  const totalPages = Math.ceil(sortedDeals.length / DEALS_PER_PAGE);
  
  // Get current page of deals
  const currentDeals = sortedDeals.slice(
    (currentPage - 1) * DEALS_PER_PAGE,
    currentPage * DEALS_PER_PAGE
  );
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the deals section
    window.scrollTo({ top: document.getElementById('available-deals')?.offsetTop || 0, behavior: 'smooth' });
  };
  
  return (
    <div className="mb-12" id="available-deals">
      <DealsHeader 
        title="All Deals" 
        sortOption={sortOption} 
        setSortOption={setSortOption} 
      />
      
      <Card>
        <CardHeader>
          <CardTitle>
            {searchQuery ? "Search Results" : "Available Deals"}
            {sortOption && <span className="text-sm font-normal text-muted-foreground ml-2">
              (Sorted by: {sortOption.label})
            </span>}
          </CardTitle>
          <CardDescription>
            {searchQuery 
              ? `Found ${sortedDeals.length} result${sortedDeals.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : `Showing ${Math.min(sortedDeals.length, (currentPage - 1) * DEALS_PER_PAGE + 1)}-${Math.min(sortedDeals.length, currentPage * DEALS_PER_PAGE)} of ${sortedDeals.length} deals`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DealsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          {currentDeals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No deals found</p>
            </div>
          ) : (
            <>
              <DealList deals={currentDeals} />
              
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
