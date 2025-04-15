
import { 
  LayoutDashboard, 
  Users, 
  ChartPie,
  Briefcase,
} from "lucide-react";

export type NavLink = {
  path: string;
  label: string;
  icon: React.ElementType;
};

export const navigationLinks: NavLink[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    path: "/deals",
    label: "Deals",
    icon: Briefcase
  },
  {
    path: "/network",
    label: "Network",
    icon: Users
  },
  {
    path: "/insights",
    label: "Insights",
    icon: ChartPie
  }
];
