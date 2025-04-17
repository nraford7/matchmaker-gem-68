
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const TopMatchesEmptyState = () => {
  return (
    <Card className="border-none bg-background shadow-none px-0">
      <CardContent className="pt-0 px-0">
        <div className="text-center py-6">
          <p className="text-muted-foreground">No matches found</p>
        </div>
      </CardContent>
      <CardFooter className="p-3 px-0">
        <Link to="/deals" className="w-full">
          <Button variant="outline" className="w-full group">
            <span>View All Deals</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
