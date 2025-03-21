
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { Investor } from "@/types";

export const GeographyForm = () => {
  const form = useFormContext<Investor>();
  
  const regions = ["US", "Canada", "Europe", "UK", "Asia", "Latin America", "Africa", "Middle East", "Australia"];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Focus</CardTitle>
        <CardDescription>
          Select the regions where you prefer to invest
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox 
                id={region}
                checked={form.watch("preferredGeographies").includes(region)}
                onCheckedChange={(checked) => {
                  const current = form.getValues("preferredGeographies");
                  if (checked) {
                    form.setValue("preferredGeographies", [...current, region]);
                  } else {
                    form.setValue("preferredGeographies", current.filter(r => r !== region));
                  }
                }}
              />
              <Label htmlFor={region}>{region}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
