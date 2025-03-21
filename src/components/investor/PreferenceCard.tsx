
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { PreferenceVisualizer } from "@/components/PreferenceVisualizer";
import { Investor } from "@/types";

interface PreferenceCardProps {
  investor: Investor;
}

export const PreferenceCard = ({ investor }: PreferenceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Preferences</CardTitle>
        <CardDescription>
          Visual representation of {investor.name}'s investment criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PreferenceVisualizer investor={investor} />
      </CardContent>
    </Card>
  );
};
