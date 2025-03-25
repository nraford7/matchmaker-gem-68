
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const SavedDealsLoadingState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Deals</CardTitle>
        <CardDescription>Track your saved investment opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <p className="text-muted-foreground">Loading saved deals...</p>
        </div>
      </CardContent>
    </Card>
  );
};
