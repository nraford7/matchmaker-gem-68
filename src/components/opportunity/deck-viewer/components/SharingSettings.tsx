
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share, Settings, Users } from "lucide-react";

interface SharingSettingsProps {
  onBack: () => void;
}

export const SharingSettings: React.FC<SharingSettingsProps> = ({ onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">Sharing Settings</h4>
      </div>
      
      <div className="grid gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <h5 className="font-medium">Visibility</h5>
                <p className="text-sm text-muted-foreground">Control who can see this opportunity</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share className="h-5 w-5 text-muted-foreground" />
              <div>
                <h5 className="font-medium">Share with Investors</h5>
                <p className="text-sm text-muted-foreground">Share this opportunity with specific investors</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Share</Button>
          </div>
        </Card>
      </div>

      <div className="flex justify-between gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};
