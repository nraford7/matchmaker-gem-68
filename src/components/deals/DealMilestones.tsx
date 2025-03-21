
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Milestone {
  description: string;
  timeline: string;
}

interface DealMilestonesProps {
  milestones: Milestone[];
}

const DealMilestones = ({ milestones }: DealMilestonesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium">{milestone.description}</p>
                <p className="text-sm text-muted-foreground">{milestone.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealMilestones;
