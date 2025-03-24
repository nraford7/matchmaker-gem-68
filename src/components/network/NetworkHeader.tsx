
import { Button } from "@/components/ui/button";
import { SampleDealsButton } from "./SampleDealsButton";
import { GenerateInvestorsButton } from "./GenerateInvestorsButton";

export const NetworkHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Your Investor Network</h1>
        <p className="text-muted-foreground">
          Discover, connect, and collaborate with other investors
        </p>
      </div>
      
      <div className="flex gap-2">
        <SampleDealsButton />
        <GenerateInvestorsButton />
      </div>
    </div>
  );
};
