
import { TrendingUp } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const TopMatchesHeader = () => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2 px-0">
      <div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle className="text-foreground">Top Matches</CardTitle>
        </div>
        <CardDescription className="mt-1">
          Investment opportunities that match your preferences
        </CardDescription>
      </div>
    </CardHeader>
  );
};
