
import React from "react";
import { Building2Icon, UsersIcon, UserIcon, UserPlusIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Stakeholder } from "./types";

interface StakeholdersSectionProps {
  stakeholders: Stakeholder[];
  handleRemoveStakeholder: (index: number) => void;
  newStakeholder: Stakeholder;
  handleStakeholderChange: (field: keyof Stakeholder, value: string) => void;
  handleAddStakeholder: () => void;
}

export const StakeholdersSection: React.FC<StakeholdersSectionProps> = ({
  stakeholders,
  handleRemoveStakeholder,
  newStakeholder,
  handleStakeholderChange,
  handleAddStakeholder,
}) => {
  return (
    <div className="border-t pt-6 space-y-4">
      <div className="flex items-center gap-2">
        <UsersIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Stakeholders</h3>
      </div>
      
      {stakeholders.length > 0 && (
        <div className="space-y-2">
          {stakeholders.map((stakeholder, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{stakeholder.name}</p>
                  <p className="text-sm text-muted-foreground">{stakeholder.role}</p>
                  {stakeholder.organization && (
                    <p className="text-xs text-muted-foreground">
                      <Building2Icon className="inline h-3 w-3 mr-1" />
                      {stakeholder.organization}
                    </p>
                  )}
                </div>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveStakeholder(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-dashed rounded-md">
        <div>
          <FormLabel htmlFor="stakeholderName">Name</FormLabel>
          <Input
            id="stakeholderName"
            placeholder="Person or Company"
            value={newStakeholder.name}
            onChange={(e) => handleStakeholderChange('name', e.target.value)}
          />
        </div>
        <div>
          <FormLabel htmlFor="stakeholderRole">Role</FormLabel>
          <Input
            id="stakeholderRole"
            placeholder="Founder, Co-investor, Board Member"
            value={newStakeholder.role}
            onChange={(e) => handleStakeholderChange('role', e.target.value)}
          />
        </div>
        <div>
          <FormLabel htmlFor="stakeholderOrg">Organization (Optional)</FormLabel>
          <Input
            id="stakeholderOrg"
            placeholder="Company Name"
            value={newStakeholder.organization || ''}
            onChange={(e) => handleStakeholderChange('organization', e.target.value)}
          />
        </div>
      </div>
      
      <Button
        type="button"
        variant="outline"
        onClick={handleAddStakeholder}
        className="w-full"
      >
        <UserPlusIcon className="h-4 w-4 mr-2" />
        Add Stakeholder
      </Button>
    </div>
  );
};
