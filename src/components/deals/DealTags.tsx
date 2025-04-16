
import { Badge } from "@/components/ui/badge";

interface DealTagsProps {
  sectorTags?: string[];
  stage?: string;
}

export const DealTags = ({ sectorTags, stage }: DealTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {sectorTags?.map((sector, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          {sector}
        </Badge>
      ))}
      
      {stage && (
        <Badge variant="outline" className="text-xs">
          {stage}
        </Badge>
      )}
    </div>
  );
};
