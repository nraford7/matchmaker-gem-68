
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
  Briefcase
} from "lucide-react";

export const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl">
            EMIR Invest
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
            <Link 
              to="/upload" 
              className={`flex items-center gap-1 text-sm ${
                currentPath === "/upload" 
                  ? "font-bold text-foreground" 
                  : "font-medium text-muted-foreground hover:text-foreground"
              }`}
            >
              <FilePlus className="h-4 w-4" />
              New
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
