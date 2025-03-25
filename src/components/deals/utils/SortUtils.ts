
import { Deal } from "@/types";
import { SortOption } from "../types";

export const sortDeals = (deals: Deal[], sortOption: SortOption | null): Deal[] => {
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
