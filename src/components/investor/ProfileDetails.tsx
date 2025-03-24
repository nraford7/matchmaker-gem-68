
import { Mail, Briefcase, Tag, Clock, MapPin, DollarSign, Award, Compass, Layers, BarChart } from "lucide-react";
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
      
      {investor.role && (
        <div className="flex items-center text-sm">
          <Award className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{investor.role}</span>
        </div>
      )}
      
      <div className="flex items-center text-sm">
        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
        <span>{investor.deal_count || investor.dealCount} deals in portfolio</span>
      </div>
      
      <div className="pt-4 border-t">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
          Sectors
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {(investor.sector_tags || investor.contextSectors || []).map(sector => (
            <div 
              key={sector} 
              className="bg-muted text-xs px-2 py-1 rounded-full"
            >
              {sector}
            </div>
          ))}
        </div>
      </div>
      
      {(investor.preferred_stages || investor.preferredStages) && (investor.preferred_stages || investor.preferredStages).length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            Preferred Stages
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(investor.preferred_stages || investor.preferredStages).map(stage => (
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
      
      {(investor.preferred_geographies || investor.preferredGeographies) && (investor.preferred_geographies || investor.preferredGeographies).length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            Geographic Focus
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(investor.preferred_geographies || investor.preferredGeographies).map(geo => (
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
      
      {(investor.check_size_min !== undefined || investor.checkSizeMin !== undefined) && 
       (investor.check_size_max !== undefined || investor.checkSizeMax !== undefined) && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            Check Size
          </h3>
          <p className="text-sm">
            ${((investor.check_size_min || investor.checkSizeMin || 0)/1000).toFixed(0)}K - ${((investor.check_size_max || investor.checkSizeMax || 0)/1000).toFixed(0)}K
          </p>
        </div>
      )}
      
      {(investor.preferred_assets || investor.preferredAssets) && (investor.preferred_assets || investor.preferredAssets).length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Layers className="h-4 w-4 mr-2 text-muted-foreground" />
            Preferred Assets
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(investor.preferred_assets || investor.preferredAssets).map(asset => (
              <div 
                key={asset} 
                className="bg-muted text-xs px-2 py-1 rounded-full"
              >
                {asset}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(investor.time_horizon || investor.timeHorizon) && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Compass className="h-4 w-4 mr-2 text-muted-foreground" />
            Time Horizon
          </h3>
          <p className="text-sm">{investor.time_horizon || investor.timeHorizon}</p>
        </div>
      )}
      
      {(investor.psychological_profile_raw || investor.psychologicalProfileRaw) && 
       Object.keys(investor.psychological_profile_raw || investor.psychologicalProfileRaw || {}).length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
            Investor Profile
          </h3>
          <div className="space-y-2 mt-1">
            {Object.entries(investor.psychological_profile_raw || investor.psychologicalProfileRaw || {}).map(([trait, value]) => (
              <div key={trait} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{trait}</span>
                  <span className="text-xs font-mono">{String(value)}/100</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${Math.min(100, Number(value))}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
