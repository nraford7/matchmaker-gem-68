
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { NavigationLinks, UserMenu, MinimalNavBar } from "@/components/navbar";

export const NavBar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // If user is not authenticated, show minimal navbar
  if (!user && currentPath !== "/") {
    return <MinimalNavBar />;
  }
  
  // Full navbar for authenticated users or home page
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl">
            OpportunityMatcher
          </Link>
          
          <NavigationLinks />
        </div>
        
        {user ? (
          <UserMenu user={user} signOut={signOut} />
        ) : (
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
