
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedDeal } from "@/types/deal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  FileText,
  Plus,
  ListTodo
} from "lucide-react";

interface DealStatusProps {
  deal: EnhancedDeal;
}

const DealStatus = ({ deal }: DealStatusProps) => {
  // This would come from real data in a production app
  const statusHistory = [
    { 
      status: "Created", 
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
      user: "John Doe",
      notes: "Deal created and added to the platform."
    },
    { 
      status: "In Due Diligence", 
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      user: "Jane Smith",
      notes: "Initial review complete. Moving to due diligence phase."
    },
    { 
      status: "Term Sheet", 
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      user: "Michael Johnson",
      notes: "Due diligence complete. Term sheet drafted and sent for review."
    }
  ];

  // Current status would typically be determined by the most recent status entry
  const currentStatus = "Term Sheet";

  // Different statuses get different icons
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "created":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "in due diligence":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "term sheet":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "closed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "on hold":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "declined":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Deal Status</CardTitle>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            {getStatusIcon(currentStatus)}
            <span className="ml-1">{currentStatus}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {statusHistory.map((item, index) => (
            <div key={index} className="relative">
              {index < statusHistory.length - 1 && (
                <div className="absolute top-6 bottom-0 left-[15px] w-[2px] bg-border" />
              )}
              <div className="flex gap-4">
                <div className="mt-1 h-6 w-6 flex-shrink-0">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">{item.status}</h4>
                    <span className="text-sm text-muted-foreground">
                      {item.date.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Updated by: {item.user}</p>
                  <p className="text-sm">{item.notes}</p>
                </div>
              </div>
            </div>
          ))}
          
          <Separator className="my-6" />
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Update
            </Button>
            <Button variant="outline" className="gap-1">
              <ListTodo className="h-4 w-4" />
              Add To Do
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealStatus;
