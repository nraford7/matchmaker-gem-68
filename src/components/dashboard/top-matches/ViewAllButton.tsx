
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ViewAllButton = () => {
  return (
    <Link to="/deals" className="w-full">
      <Button variant="outline" className="w-full group">
        <span>View All Matches</span>
        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  );
};
