
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Briefcase, Save, Archive, ArrowDown, ArrowUp } from "lucide-react";
import { Deal } from "@/types";
import { DealList } from "./DealList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DealsTabsProps {
  activeDeals: Deal[];
  savedDeals: Deal[];
  pastDeals: Deal[];
}

type SortOption = {
  label: string;
  key: keyof Deal | 'createdAtDesc' | 'createdAtAsc' | 'checkSizeDesc' | 'checkSizeAsc' | 'IRRDesc' | 'IRRAsc';
  direction: 'asc' | 'desc';
};

export const DealsTabs = ({ activeDeals, savedDeals, pastDeals }: DealsTabsProps) => {
  const [sortOption, setSortOption] = useState<SortOption | null>(null);
  
  // Add logging to track the incoming data
  useEffect(() => {
    console.log('DealsTabs - Active Deals:', activeDeals);
    console.log('DealsTabs - Saved Deals:', savedDeals);
    console.log('DealsTabs - Past Deals:', pastDeals);
  }, [activeDeals, savedDeals, pastDeals]);
  
  // Function to sort deals based on the current sort option
  const sortDeals = (deals: Deal[]) => {
    if (!sortOption) return deals;
    
    return [...deals].sort((a, b) => {
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
  };
  
  const sortedActiveDeals = sortDeals(activeDeals);
  const sortedSavedDeals = sortDeals(savedDeals);
  const sortedPastDeals = sortDeals(pastDeals);
  
  return (
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
      
      <TabsContent value="active" className="space-y-6">
        {sortedActiveDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No active deals</p>
            <Button variant="default" className="mt-4">Find Opportunities</Button>
          </div>
        ) : (
          <>
            {sortOption && (
              <p className="text-sm text-muted-foreground">Sorted by: {sortOption.label}</p>
            )}
            <DealList deals={sortedActiveDeals} />
          </>
        )}
      </TabsContent>
      
      <TabsContent value="saved" className="space-y-6">
        {sortedSavedDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No saved deals</p>
            <Button variant="default" className="mt-4">Browse Opportunities</Button>
          </div>
        ) : (
          <>
            {sortOption && (
              <p className="text-sm text-muted-foreground">Sorted by: {sortOption.label}</p>
            )}
            <DealList deals={sortedSavedDeals} showMatchScore={true} />
          </>
        )}
      </TabsContent>
      
      <TabsContent value="past" className="space-y-6">
        {sortedPastDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No past deals</p>
          </div>
        ) : (
          <>
            {sortOption && (
              <p className="text-sm text-muted-foreground">Sorted by: {sortOption.label}</p>
            )}
            <DealList deals={sortedPastDeals} />
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};
