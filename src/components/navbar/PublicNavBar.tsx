
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PublicNavBar = () => {
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl">
            The Guild
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              to="/about" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link 
              to="/public-deals" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Deals
            </Link>
            <Link 
              to="/public-ai" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              AI
            </Link>
            <Link 
              to="/apply" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Apply
            </Link>
          </nav>
        </div>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    </div>
  );
};
