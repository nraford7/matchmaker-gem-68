
import { Deal } from "@/types";

export type SortOption = {
  label: string;
  key: keyof Deal | 'createdAtDesc' | 'createdAtAsc' | 'checkSizeDesc' | 'checkSizeAsc' | 'IRRDesc' | 'IRRAsc';
  direction: 'asc' | 'desc';
};

export type SortFunction = (deals: Deal[]) => Deal[];
