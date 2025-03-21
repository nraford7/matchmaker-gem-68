
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter } from "lucide-react";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/OpportunityList";
import { mockOpportunities } from "@/data/mockData";

const Browse = () => {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  
  // Get unique sectors and stages for filters
  const sectors = [...new Set(opportunities.map(opp => opp.sector))];
  const stages = [...new Set(opportunities.map(opp => opp.stage))];
  
  // Filter opportunities based on search and filters
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = searchQuery === "" || 
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = selectedSector === null || opp.sector === selectedSector;
    const matchesStage = selectedStage === null || opp.stage === selectedStage;
    
    return matchesSearch && matchesSector && matchesStage;
  });
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Browse Opportunities</h1>
        <p className="text-muted-foreground">
          Explore all available investment opportunities
        </p>
      </div>
      
      {/* Search and filter section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search opportunities..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedSector || undefined} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map(sector => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStage || undefined} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {stages.map(stage => (
                <SelectItem key={stage} value={stage}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {(selectedSector || selectedStage || searchQuery) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedSector(null);
                setSelectedStage(null);
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Opportunities</CardTitle>
          <CardDescription>
            Browse all available investment opportunities
            {filteredOpportunities.length < opportunities.length && (
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
