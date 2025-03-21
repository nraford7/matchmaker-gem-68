
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  navigateBack: () => void;
}

export const ProfileHeader = ({ navigateBack }: ProfileHeaderProps) => {
  return (
    <Button 
      variant="ghost" 
      className="mb-6" 
      onClick={navigateBack}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Network
    </Button>
  );
};
