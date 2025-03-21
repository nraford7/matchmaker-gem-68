
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Search, 
  Filter, 
  Users, 
  User,
  FilePlus,
  LogOut,
  Settings,
  ChartPie,
  Briefcase
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavBar = () => {
  const [currentUser] = useState({
    name: "Jane Smith",
    company: "Acme Capital"
  });
  
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl">
            OpportunityMatcher
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/dashboard" 
                  ? "font-bold text-foreground" 
                  : "font-medium text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/deals" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/deals" 
                  ? "font-bold text-foreground" 
                  : "font-medium text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Deals
            </Link>
            <Link 
              to="/network" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/network" 
                  ? "font-bold text-foreground" 
                  : "font-medium text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Network
            </Link>
            <Link 
              to="/insights" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/insights" 
                  ? "font-bold text-foreground" 
                  : "font-medium text-muted-foreground hover:text-foreground"
              }`}
            >
              <ChartPie className="h-4 w-4" />
              Insights
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <div className="hidden md:flex flex-col items-end justify-center cursor-pointer hover:opacity-80 transition-opacity">
                <span className="text-sm font-medium">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground">{currentUser.company}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-1">
                <h4 className="font-medium leading-none mb-2">{currentUser.name}</h4>
                <p className="text-xs text-muted-foreground">{currentUser.company}</p>
              </div>
              <div className="mt-4 space-y-2">
                <Link 
                  to="/preferences" 
                  className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Preferences
                </Link>
                <Link 
                  to="/account" 
                  className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Account settings
                </Link>
                <div className="border-t my-2"></div>
                <button 
                  className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-1">
                <h4 className="font-medium leading-none mb-2">{currentUser.name}</h4>
                <p className="text-xs text-muted-foreground">{currentUser.company}</p>
              </div>
              <div className="mt-4 space-y-2">
                <Link 
                  to="/preferences" 
                  className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Preferences
                </Link>
                <Link 
                  to="/account" 
                  className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Account settings
                </Link>
                <div className="border-t my-2"></div>
                <button 
                  className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
