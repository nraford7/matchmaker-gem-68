
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Users } from "lucide-react";

interface NetworkHighlightsEmptyProps {
  onReloadDeals: () => void;
}

export const NetworkHighlightsEmpty = ({ onReloadDeals }: NetworkHighlightsEmptyProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Network Highlights</CardTitle>
        </div>
        <CardDescription>
          Deals recommended by investors in your network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No shared deals yet</h3>
          <p className="text-muted-foreground text-sm mb-4 max-w-md">
            When investors in your network recommend deals to you, they'll appear here with their comments.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onReloadDeals} 
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
