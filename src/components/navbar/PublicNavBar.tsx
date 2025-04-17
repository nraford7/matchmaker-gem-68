import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PublicNavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-serif font-bold text-xl text-crimson">
            The Guild
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              to="/about" 
              className="font-serif text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link 
              to="/public-deals" 
              className="font-serif text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Deals
            </Link>
            <Link 
              to="/public-ai" 
              className="font-serif text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              AI
            </Link>
            <Link 
              to="/apply" 
              className="font-serif text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Apply
            </Link>
          </nav>
        </div>
        <Link to="/auth">
          <Button className="bg-crimson text-white hover:bg-crimson/90 font-serif">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};
