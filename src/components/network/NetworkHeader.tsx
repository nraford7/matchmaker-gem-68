
import { Users } from "lucide-react";

export const NetworkHeader = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 mb-1">
        <Users className="h-8 w-8 text-primary" />
        Network
      </h1>
      <p className="text-muted-foreground">
        Connect with other investors and discover opportunities
      </p>
    </div>
  );
};
