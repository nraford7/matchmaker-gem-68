
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamMember {
  name: string;
  role: string;
}

interface DealTeamProps {
  team: TeamMember[];
}

const DealTeam = ({ team }: DealTeamProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {team.map((member, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealTeam;
