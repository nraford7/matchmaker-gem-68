
import { BellIcon, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          New Match Alerts
        </h1>
        <p className="text-muted-foreground">
          Opportunities that best match your investment criteria
        </p>
      </div>
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
