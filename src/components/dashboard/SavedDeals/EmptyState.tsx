
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SavedDealsEmptyState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Deals</CardTitle>
        <CardDescription>Track your saved investment opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <p className="text-muted-foreground">No saved deals yet</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/deals" className="w-full">
          <Button variant="outline" className="w-full">
            View All Deals
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
