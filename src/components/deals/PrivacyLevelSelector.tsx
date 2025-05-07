
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PrivacyLevel } from "@/types/deal";
import { Globe, Lock, Key } from "lucide-react";

interface PrivacyLevelSelectorProps {
  value: PrivacyLevel;
  onChange: (value: PrivacyLevel) => void;
}

export const PrivacyLevelSelector: React.FC<PrivacyLevelSelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-base">Privacy Level</Label>
      
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as PrivacyLevel)}
        className="grid grid-cols-1 gap-4 pt-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="OPEN" id="privacy-open" />
          <Label
            htmlFor="privacy-open"
            className="flex items-center gap-2 font-normal cursor-pointer"
          >
            <Globe className="h-4 w-4 text-green-500" />
            <div>
              <span className="font-medium">Open</span> - 
              <span className="text-muted-foreground ml-1">Full details visible to all investors</span>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="CONFIDENTIAL" id="privacy-confidential" />
          <Label
            htmlFor="privacy-confidential"
            className="flex items-center gap-2 font-normal cursor-pointer"
          >
            <Lock className="h-4 w-4 text-amber-500" />
            <div>
              <span className="font-medium">Confidential</span> - 
              <span className="text-muted-foreground ml-1">Limited details visible, one-click registration for full access</span>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="INVITATION_ONLY" id="privacy-invitation" />
          <Label
            htmlFor="privacy-invitation"
            className="flex items-center gap-2 font-normal cursor-pointer"
          >
            <Key className="h-4 w-4 text-red-500" />
            <div>
              <span className="font-medium">Invitation Only</span> - 
              <span className="text-muted-foreground ml-1">Minimal details visible, requires your approval for access</span>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
