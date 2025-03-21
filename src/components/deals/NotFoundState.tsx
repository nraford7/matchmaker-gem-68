
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundState = () => {
  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold mb-4">Deal Not Found</h2>
        <p className="text-muted-foreground mb-6">The deal you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/deals">Back to Deals</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundState;
