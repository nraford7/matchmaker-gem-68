
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { PublicNavBar } from "./PublicNavBar";
import { NavLinks } from "./NavLinks";
import { MobileNavigation } from "./MobileNavigation";
import { UserMenu } from "./UserMenu";

export const NavBar = () => {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  
  // If user is not authenticated, show public navbar with dark theme
  if (!user) {
    return <PublicNavBar />;
  }
  
  // Full navbar for authenticated users with light theme
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl text-crimson">
            The Guild
          </Link>
          
          <NavLinks />
        </div>
        
        <div className="flex items-center gap-4">
          {isMobile && <MobileNavigation />}
          
          <UserMenu user={user} signOut={signOut} />
        </div>
      </div>
    </div>
  );
};
