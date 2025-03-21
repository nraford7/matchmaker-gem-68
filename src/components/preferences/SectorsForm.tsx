
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { Investor } from "@/types";

export const SectorsForm = () => {
  const form = useFormContext<Investor>();
  
  const sectors = ["Fintech", "Health Tech", "SaaS", "AI/ML", "Cybersecurity", 
    "EdTech", "CleanTech", "E-commerce", "Gaming", "IoT", 
    "Consumer Tech", "Enterprise Software"];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferred Sectors</CardTitle>
        <CardDescription>
          Select the sectors and industries you're most interested in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sectors.map((sector) => (
            <div key={sector} className="flex items-center space-x-2">
              <Checkbox 
                id={sector}
                checked={form.watch("preferredSectors").includes(sector)}
                onCheckedChange={(checked) => {
                  const current = form.getValues("preferredSectors");
                  if (checked) {
                    form.setValue("preferredSectors", [...current, sector]);
                  } else {
                    form.setValue("preferredSectors", current.filter(s => s !== sector));
                  }
                }}
              />
              <Label htmlFor={sector}>{sector}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
