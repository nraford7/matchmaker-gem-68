
import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="container mx-auto py-6 flex justify-center items-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};
