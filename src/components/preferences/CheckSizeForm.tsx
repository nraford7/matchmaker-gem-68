
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { Investor } from "@/types";

export const CheckSizeForm = () => {
  const form = useFormContext<Investor>();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Check Size</CardTitle>
        <CardDescription>
          Define your minimum and maximum investment amounts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="checkSizeMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum ($)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="checkSizeMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum ($)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
