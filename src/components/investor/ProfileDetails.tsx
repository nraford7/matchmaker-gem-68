
import { Mail, Briefcase, Tag, Clock, MapPin, DollarSign } from "lucide-react";
import { NetworkInvestor } from "@/types";

interface ProfileDetailsProps {
  investor: NetworkInvestor;
}

export const ProfileDetails = ({ investor }: ProfileDetailsProps) => {
  return (
    <div className="space-y-4">
      {investor.email && (
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{investor.email}</span>
        </div>
      )}
      
      <div className="flex items-center text-sm">
        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
        <span>{investor.dealCount} deals in portfolio</span>
      </div>
      
      <div className="pt-4 border-t">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
          Sectors
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {investor.sectors.map(sector => (
            <div 
              key={sector} 
              className="bg-muted text-xs px-2 py-1 rounded-full"
            >
              {sector}
            </div>
          ))}
        </div>
      </div>
      
      {investor.preferredStages && investor.preferredStages.length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            Preferred Stages
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {investor.preferredStages.map(stage => (
              <div 
                key={stage} 
                className="bg-muted text-xs px-2 py-1 rounded-full"
              >
                {stage}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {investor.preferredGeographies && investor.preferredGeographies.length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            Geographic Focus
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {investor.preferredGeographies.map(geo => (
              <div 
                key={geo} 
                className="bg-muted text-xs px-2 py-1 rounded-full"
              >
                {geo}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {investor.checkSizeMin !== undefined && investor.checkSizeMax !== undefined && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            Check Size
          </h3>
          <p className="text-sm">
            ${(investor.checkSizeMin/1000).toFixed(0)}K - ${(investor.checkSizeMax/1000).toFixed(0)}K
          </p>
        </div>
      )}
    </div>
  );
};
