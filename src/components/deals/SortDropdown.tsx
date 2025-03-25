
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, ArrowDown, ArrowUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortOption } from "./types";

interface SortDropdownProps {
  sortOption: SortOption | null;
  setSortOption: (option: SortOption | null) => void;
}

export const SortDropdown = ({ sortOption, setSortOption }: SortDropdownProps) => {
  return (
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
  );
};
