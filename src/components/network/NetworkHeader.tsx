
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NetworkHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          Network
        </h1>
        <Link to="/investor-onboarding">
          <Button className="bg-crimson text-white hover:bg-crimson/90">
            Become an Investor
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground">
        Connect with other investors and discover opportunities
      </p>
    </div>
  );
};
