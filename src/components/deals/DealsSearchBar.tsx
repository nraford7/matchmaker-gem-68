
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DealsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const DealsSearchBar = ({ searchQuery, setSearchQuery }: DealsSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input 
        placeholder="Describe the kind of opportunity you're looking for..." 
        className="pl-9"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
          onClick={() => setSearchQuery("")}
        >
          Clear
        </Button>
      )}
    </div>
  );
};
