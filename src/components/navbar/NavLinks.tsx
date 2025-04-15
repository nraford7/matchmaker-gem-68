
import { Link, useLocation } from "react-router-dom";
import { navigationLinks } from "@/config/navigation";

interface NavLinksProps {
  mobile?: boolean;
}

export const NavLinks = ({ mobile = false }: NavLinksProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (mobile) {
    return null; // Mobile links are handled by MobileNavigation
  }

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navigationLinks.map((link) => (
        <Link 
          key={link.path}
          to={link.path} 
          className={`flex items-center gap-2 text-base font-serif ${
            currentPath === link.path 
              ? "font-bold text-foreground" 
              : "font-medium text-muted-foreground hover:text-foreground"
          }`}
        >
          <link.icon className="h-5 w-5 mr-1" />
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
