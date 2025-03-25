
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { SortOption } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortDropdown } from "./SortDropdown";

interface DealsHeaderProps {
  title: string;
  sortOption: SortOption | null;
  setSortOption: (option: SortOption | null) => void;
}

export const DealsHeader = ({ title, sortOption, setSortOption }: DealsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        {title}
      </h2>
      
      <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
    </div>
  );
};
