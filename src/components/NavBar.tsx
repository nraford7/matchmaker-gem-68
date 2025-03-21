
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
import { useAuth } from "@/contexts/AuthContext";

export const NavBar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  // If user is not authenticated, show minimal navbar
  if (!user && currentPath !== "/") {
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
  }
  
  // Full navbar for authenticated users or home page
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
        
        {user ? (
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <div className="hidden md:flex flex-col items-end justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="text-sm font-medium">{user.user_metadata.full_name || user.email}</span>
                  <span className="text-xs text-muted-foreground">{user.user_metadata.company || ""}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-1">
                  <h4 className="font-medium leading-none mb-2">{user.user_metadata.full_name || user.email}</h4>
                  <p className="text-xs text-muted-foreground">{user.user_metadata.company || ""}</p>
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
                    onClick={() => signOut()}
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
                    <AvatarFallback>
                      {user.user_metadata.full_name 
                        ? getInitials(user.user_metadata.full_name) 
                        : user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-1">
                  <h4 className="font-medium leading-none mb-2">{user.user_metadata.full_name || user.email}</h4>
                  <p className="text-xs text-muted-foreground">{user.user_metadata.company || ""}</p>
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
                    onClick={() => signOut()}
                    className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
