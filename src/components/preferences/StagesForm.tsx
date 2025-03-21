
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { Investor } from "@/types";

export const StagesForm = () => {
  const form = useFormContext<Investor>();
  
  const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Growth"];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Stages</CardTitle>
        <CardDescription>
          Select the stages you typically invest in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {stages.map((stage) => (
            <div key={stage} className="flex items-center space-x-2">
              <Checkbox 
                id={stage}
                checked={form.watch("preferredStages").includes(stage)}
                onCheckedChange={(checked) => {
                  const current = form.getValues("preferredStages");
                  if (checked) {
                    form.setValue("preferredStages", [...current, stage]);
                  } else {
                    form.setValue("preferredStages", current.filter(s => s !== stage));
                  }
                }}
              />
              <Label htmlFor={stage}>{stage}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
