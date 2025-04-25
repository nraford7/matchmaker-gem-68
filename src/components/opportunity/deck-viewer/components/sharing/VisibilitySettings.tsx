
import React from "react";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface VisibilitySettingsProps {
  sharingOption: string;
  onSharingOptionChange: (value: string) => void;
}

export const VisibilitySettings: React.FC<VisibilitySettingsProps> = ({
  sharingOption,
  onSharingOptionChange,
}) => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <h5 className="font-medium">Visibility Settings</h5>
        </div>
        <RadioGroup 
          value={sharingOption} 
          onValueChange={onSharingOptionChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="selected" id="selected" />
            <Label htmlFor="selected">Selected investors only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="followers" id="followers" />
            <Label htmlFor="followers">My network (investors who follow me)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public">All investors on the platform</Label>
          </div>
        </RadioGroup>
      </div>
    </Card>
  );
};
