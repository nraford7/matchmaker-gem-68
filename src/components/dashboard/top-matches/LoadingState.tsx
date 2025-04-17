
import { Card, CardContent } from "@/components/ui/card";

export const TopMatchesLoadingState = () => {
  return (
    <Card className="border-none bg-background shadow-none px-0">
      <CardContent className="pt-0 px-0">
        <div className="text-center py-6">
          <p className="text-muted-foreground">Loading matches...</p>
        </div>
      </CardContent>
    </Card>
  );
};
