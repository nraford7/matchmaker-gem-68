
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, ArrowDown, ArrowUp } from "lucide-react";
import { Deal } from "@/types";
import { DealList } from "./DealList";
import { DealsSearchBar } from "./DealsSearchBar";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface AllOpportunitiesProps {
  allDeals: Deal[];
  filteredDeals: Deal[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

type SortOption = {
  label: string;
  key: keyof Deal | 'createdAtDesc' | 'createdAtAsc' | 'checkSizeDesc' | 'checkSizeAsc' | 'IRRDesc' | 'IRRAsc';
  direction: 'asc' | 'desc';
};

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
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (!sortOption) return 0;
    
    switch (sortOption.key) {
      case 'createdAtDesc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'createdAtAsc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'checkSizeDesc':
        return (b.checkSizeRequired || 0) - (a.checkSizeRequired || 0);
      case 'checkSizeAsc':
        return (a.checkSizeRequired || 0) - (b.checkSizeRequired || 0);
      case 'IRRDesc':
        return (b.IRR || 0) - (a.IRR || 0);
      case 'IRRAsc':
        return (a.IRR || 0) - (b.IRR || 0);
      default:
        return 0;
    }
  });
  
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
  
  // Generate page numbers for pagination
  const renderPaginationItems = () => {
    const items = [];
    
    // Calculate which page numbers to display
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    // Always show first page
    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink isActive={currentPage === 1} onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Add ellipsis if needed
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Always show last page
    if (endPage < totalPages) {
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key="last">
          <PaginationLink isActive={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  return (
    <div className="mb-12" id="available-deals">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          All Deals
        </h2>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => setSortOption({ label: 'Newest first', key: 'createdAtDesc', direction: 'desc' })}
                className="flex justify-between"
              >
                Newest first
                {sortOption?.key === 'createdAtDesc' && <ArrowDown className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortOption({ label: 'Oldest first', key: 'createdAtAsc', direction: 'asc' })}
                className="flex justify-between"
              >
                Oldest first
                {sortOption?.key === 'createdAtAsc' && <ArrowUp className="h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => setSortOption({ label: 'Investment Ask (High to Low)', key: 'checkSizeDesc', direction: 'desc' })}
                className="flex justify-between"
              >
                Investment Ask (High to Low)
                {sortOption?.key === 'checkSizeDesc' && <ArrowDown className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortOption({ label: 'Investment Ask (Low to High)', key: 'checkSizeAsc', direction: 'asc' })}
                className="flex justify-between"
              >
                Investment Ask (Low to High)
                {sortOption?.key === 'checkSizeAsc' && <ArrowUp className="h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => setSortOption({ label: 'IRR (High to Low)', key: 'IRRDesc', direction: 'desc' })}
                className="flex justify-between"
              >
                Estimated IRR (High to Low)
                {sortOption?.key === 'IRRDesc' && <ArrowDown className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortOption({ label: 'IRR (Low to High)', key: 'IRRAsc', direction: 'asc' })}
                className="flex justify-between"
              >
                Estimated IRR (Low to High)
                {sortOption?.key === 'IRRAsc' && <ArrowUp className="h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => setSortOption(null)}
              className="text-muted-foreground"
            >
              Clear sorting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
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
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <Pagination className="mt-6">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    
                    {renderPaginationItems()}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
