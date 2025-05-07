
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, Lock, Key } from "lucide-react";
import { PrivacyLevel } from "@/types/deal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PrivacyBadgeProps {
  privacyLevel: PrivacyLevel;
  className?: string;
}

const privacyConfig = {
  OPEN: {
    icon: Globe,
    label: "Open",
    tooltip: "This deal is open to all investors",
    variant: "outline" as const,
    bgColor: "bg-green-100",
    textColor: "text-green-700"
  },
  CONFIDENTIAL: {
    icon: Lock,
    label: "Confidential",
    tooltip: "Registration required to view full details",
    variant: "secondary" as const,
    bgColor: "bg-amber-100",
    textColor: "text-amber-700"
  },
  INVITATION_ONLY: {
    icon: Key,
    label: "Invitation Only",
    tooltip: "Registration and approval required to view details",
    variant: "destructive" as const,
    bgColor: "bg-red-100",
    textColor: "text-red-700"
  }
};

export const PrivacyBadge: React.FC<PrivacyBadgeProps> = ({ privacyLevel = "OPEN", className = "" }) => {
  const config = privacyConfig[privacyLevel];
  const Icon = config.icon;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant={config.variant}
            className={`${config.bgColor} ${config.textColor} border-none ${className}`}
          >
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
