
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PreferenceVisualizer } from "@/components/PreferenceVisualizer";
import { Investor } from "@/types";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface PreferenceSidebarProps {
  isSaving: boolean;
}

export const PreferenceSidebar = ({ isSaving }: PreferenceSidebarProps) => {
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
        
        <Button 
          type="submit" 
          className="w-full mt-6"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
