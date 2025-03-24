
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { Investor, NetworkInvestor } from "@/types";

export const SectorsForm = () => {
  const form = useFormContext<Investor & { sector_tags?: string[] }>();
  
  const sectors = ["Fintech", "Health Tech", "SaaS", "AI/ML", "Cybersecurity", 
    "EdTech", "CleanTech", "E-commerce", "Gaming", "IoT", 
    "Consumer Tech", "Enterprise Software", "Mobility", "Infrastructure"];
  
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
                checked={(form.watch("sector_tags") || []).includes(sector)}
                onCheckedChange={(checked) => {
                  const current = form.getValues("sector_tags") || [];
                  if (checked) {
                    form.setValue("sector_tags", [...current, sector]);
                  } else {
                    form.setValue("sector_tags", current.filter(s => s !== sector));
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
