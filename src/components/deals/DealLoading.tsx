
import { Loader2 } from "lucide-react";

const DealLoading = () => {
  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading deal details...</span>
      </div>
    </div>
  );
};

export default DealLoading;
