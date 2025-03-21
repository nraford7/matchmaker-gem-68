
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FundUsage {
  category: string;
  percentage: number;
}

interface DealFundsUsageProps {
  useOfFunds: FundUsage[];
}

const DealFundsUsage = ({ useOfFunds }: DealFundsUsageProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Use of Funds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {useOfFunds.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{item.category}</span>
                <span>{item.percentage}%</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealFundsUsage;
