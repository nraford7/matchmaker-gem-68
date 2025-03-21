
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PreferenceVisualizer } from "@/components/PreferenceVisualizer";
import { Investor } from "@/types";
import { useFormContext } from "react-hook-form";

export const PreferenceSidebar = () => {
  const form = useFormContext<Investor>();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preference Visualization</CardTitle>
        <CardDescription>
          See a visual representation of your investment criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PreferenceVisualizer investor={form.getValues()} />
      </CardContent>
    </Card>
  );
};
