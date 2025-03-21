
import { BellIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-end mb-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <BellIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
