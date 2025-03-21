
import { Link, useLocation } from "react-router-dom";
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
  Briefcase,
  ChevronDown
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl text-gray-900">
            OpportunityMatcher
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/dashboard" 
                  ? "font-bold text-gray-900" 
                  : "font-medium text-gray-600 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/deals" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/deals" 
                  ? "font-bold text-gray-900" 
                  : "font-medium text-gray-600 hover:text-gray-900"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Deals
            </Link>
            <Link 
              to="/insights" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/insights" 
                  ? "font-bold text-gray-900" 
                  : "font-medium text-gray-600 hover:text-gray-900"
              }`}
            >
              <ChartPie className="h-4 w-4" />
              Insights
            </Link>
            <Link 
              to="/upload" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/upload" 
                  ? "font-bold text-gray-900" 
                  : "font-medium text-gray-600 hover:text-gray-900"
              }`}
            >
              <FilePlus className="h-4 w-4" />
              New
            </Link>
          </nav>
        </div>
        
        {/* User Avatar with Dropdown */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
              <div className="text-sm text-gray-700 font-medium hidden sm:block">
                Alex Johnson
              </div>
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-gray-100 text-gray-700">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
