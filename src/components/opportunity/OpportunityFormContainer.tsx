
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { OpportunityForm } from "./OpportunityForm";

export const OpportunityFormContainer = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <UploadCloud className="h-6 w-6 text-primary" />
          <CardTitle>Upload New Opportunity</CardTitle>
        </div>
        <CardDescription>
          Upload your pitch document and let AI extract and analyze the details for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OpportunityForm />
      </CardContent>
    </Card>
  );
};
