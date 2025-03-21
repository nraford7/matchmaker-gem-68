
import { Users } from "lucide-react";

export const NetworkHeader = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 mb-4">
        <Users className="h-6 w-6 text-primary" />
        Network
      </h1>
      <p className="text-muted-foreground mb-6">
        Connect with other investors and discover opportunities
      </p>
    </div>
  );
};
