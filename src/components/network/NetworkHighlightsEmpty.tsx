
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { SampleDealsButton } from "./SampleDealsButton";

export const NetworkHighlightsEmpty = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Network Highlights</CardTitle>
        </div>
        <CardDescription>
          Deals shared with you by investors in your network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No shared deals yet</h3>
          <p className="text-muted-foreground text-sm mb-4 max-w-md">
            When investors in your network share deals with you, they'll appear here with their comments.
          </p>
          <SampleDealsButton />
        </div>
      </CardContent>
    </Card>
  );
};
