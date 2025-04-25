
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileSearch, Share } from "lucide-react";

export const TabNavigation = () => {
  return (
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="original" className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Original Deck
      </TabsTrigger>
      <TabsTrigger value="review" className="flex items-center gap-2">
        <FileSearch className="h-4 w-4" />
        AI Review
      </TabsTrigger>
      <TabsTrigger value="detailed">AI Summary</TabsTrigger>
      <TabsTrigger value="sharing" className="flex items-center gap-2">
        <Share className="h-4 w-4" />
        Sharing Settings
      </TabsTrigger>
    </TabsList>
  );
};
