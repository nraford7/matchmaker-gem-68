
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Search, 
  Filter, 
  Users, 
  BarChart,
  User
} from "lucide-react";

export const NavBar = () => {
  const [currentUser] = useState({
    name: "Jane Smith",
    company: "Acme Capital"
  });
  
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl">
            OpportunityMatcher
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/opportunities" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Search className="h-4 w-4" />
              Browse
            </Link>
            <Link to="/preferences" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Filter className="h-4 w-4" />
              Preferences
            </Link>
            <Link to="/network" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Users className="h-4 w-4" />
              Network
            </Link>
            <Link to="/analytics" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <BarChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="flex flex-col items-end justify-center">
              <span className="text-sm font-medium">{currentUser.name}</span>
              <span className="text-xs text-muted-foreground">{currentUser.company}</span>
            </div>
          </div>
          
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
