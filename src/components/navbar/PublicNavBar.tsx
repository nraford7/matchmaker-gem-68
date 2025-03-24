
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PublicNavBar = () => {
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          OpportunityMatcher
        </Link>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    </div>
  );
};
