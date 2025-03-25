
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const TopMatchesLoadingState = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Illuminations</CardTitle>
          </div>
          <CardDescription className="mt-1">
            Newly discovered territories of opportunity, illuminated by our proprietary intelligence system
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-center py-6">
          <p className="text-muted-foreground">Loading illuminations...</p>
        </div>
      </CardContent>
    </Card>
  );
};
