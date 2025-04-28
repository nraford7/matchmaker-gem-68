
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSearch, MessageSquare, Share } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onChange: (value: string) => void;
}

export const TabNavigation = ({ activeTab, onChange }: TabNavigationProps) => {
  return (
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger 
        value="review" 
        className="flex items-center gap-2"
        onClick={() => onChange("review")}
      >
        <FileSearch className="h-4 w-4" />
        AI Review
      </TabsTrigger>
      <TabsTrigger 
        value="detailed"
        onClick={() => onChange("detailed")}
      >
        AI Summary
      </TabsTrigger>
      <TabsTrigger 
        value="sharing" 
        className="flex items-center gap-2"
        onClick={() => onChange("sharing")}
      >
        <Share className="h-4 w-4" />
        Share
      </TabsTrigger>
    </TabsList>
  );
};
