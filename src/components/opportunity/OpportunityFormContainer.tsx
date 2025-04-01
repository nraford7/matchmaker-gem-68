
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon } from "lucide-react";
import { OpportunityForm } from "./OpportunityForm";

export const OpportunityFormContainer = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="h-6 w-6 text-primary" />
          <CardTitle>Upload New Opportunity</CardTitle>
        </div>
        <CardDescription>
          Upload your pitch document and let AI help you fill out the details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OpportunityForm />
      </CardContent>
    </Card>
  );
};
