
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export const TopMatchesEmptyState = () => {
  return (
    <Card className="shadow-sm">
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
          <p className="text-muted-foreground">No illuminations found</p>
        </div>
      </CardContent>
      <CardFooter className="p-3">
        <Link to="/deals" className="w-full">
          <Button variant="outline" className="w-full group">
            <span>Explore All Illuminations</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
