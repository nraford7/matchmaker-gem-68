
import { Users, Upload } from "lucide-react";
import { InvestorUpload } from "./InvestorUpload";

export const NetworkHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          Network
        </h1>
        <InvestorUpload />
      </div>
      <p className="text-muted-foreground">
        Connect with other investors and discover opportunities
      </p>
    </div>
  );
};
