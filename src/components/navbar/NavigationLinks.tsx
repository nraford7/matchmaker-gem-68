
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ChartPie,
  Briefcase
} from "lucide-react";

export const NavigationLinks = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
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
  );
};
