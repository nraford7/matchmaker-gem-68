
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NetworkSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const NetworkSearchBar = ({ searchQuery, onSearchChange }: NetworkSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search investors..." 
        className="pl-10 w-[250px]"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
