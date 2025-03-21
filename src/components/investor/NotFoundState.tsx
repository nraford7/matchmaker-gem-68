
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotFoundStateProps {
  navigateBack: () => void;
}

export const NotFoundState = ({ navigateBack }: NotFoundStateProps) => {
  return (
    <div className="container mx-auto py-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Investor not found</h1>
      <Button onClick={navigateBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Network
      </Button>
    </div>
  );
};
