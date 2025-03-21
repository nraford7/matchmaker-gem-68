
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { Investor } from "@/types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Define check size options
const CHECK_SIZE_OPTIONS = [
  { value: 100000, label: "$100,000" },
  { value: 250000, label: "$250,000" },
  { value: 500000, label: "$500,000" },
  { value: 1000000, label: "$1 million" },
  { value: 2500000, label: "$2.5 million" },
  { value: 5000000, label: "$5 million" },
  { value: 10000000, label: "$10 million+" },
];

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
                <FormLabel>Minimum</FormLabel>
                <Select 
                  value={String(field.value)} 
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum check size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CHECK_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="checkSizeMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum</FormLabel>
                <Select 
                  value={String(field.value)} 
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select maximum check size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CHECK_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
