
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  type: "following" | "search";
  searchQuery?: string;
  onClearSearch?: () => void;
  onDiscoverInvestors?: () => void;
}

export const EmptyState = ({ 
  type, 
  searchQuery, 
  onClearSearch, 
  onDiscoverInvestors 
}: EmptyStateProps) => {
  if (type === "following") {
    return (
      <Card>
        <CardContent className="py-10 flex flex-col items-center justify-center text-center">
          <Users className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No investors found</h3>
          <p className="text-muted-foreground mb-4">
            You're not following any investors yet.
          </p>
          <Button onClick={onDiscoverInvestors}>Discover Investors</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="py-10 flex flex-col items-center justify-center text-center">
        <Search className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No investors found</h3>
        <p className="text-muted-foreground mb-4">
          {searchQuery ? "No results match your search criteria." : "Try adjusting your search to find investors"}
        </p>
        <Button onClick={onClearSearch}>Clear Search</Button>
      </CardContent>
    </Card>
  );
};
