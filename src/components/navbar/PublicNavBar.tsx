
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PublicNavBar = () => {
  return (
    <div className="border-b border-champagne/10 bg-obsidian">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-serif font-bold text-xl text-champagne">
            The Guild
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              to="/about" 
              className="font-serif text-sm font-medium text-ivory/70 hover:text-champagne transition-colors"
            >
              About
            </Link>
            <Link 
              to="/public-deals" 
              className="font-serif text-sm font-medium text-ivory/70 hover:text-champagne transition-colors"
            >
              Deals
            </Link>
            <Link 
              to="/public-ai" 
              className="font-serif text-sm font-medium text-ivory/70 hover:text-champagne transition-colors"
            >
              AI
            </Link>
            <Link 
              to="/apply" 
              className="font-serif text-sm font-medium text-ivory/70 hover:text-champagne transition-colors"
            >
              Apply
            </Link>
          </nav>
        </div>
        <Link to="/auth">
          <Button className="bg-midnight hover:bg-midnight/90 text-ivory font-serif">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};
