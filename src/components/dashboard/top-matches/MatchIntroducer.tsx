
import { Link } from "react-router-dom";

interface MatchIntroducerProps {
  introducerId: string;
  name: string | null;
}

export const MatchIntroducer = ({ introducerId, name }: MatchIntroducerProps) => {
  return (
    <div className="text-xs text-muted-foreground mt-0.5">
      Introduced by:{" "}
      <Link 
        to={`/investor/${introducerId}`} 
        className="font-medium hover:text-primary transition-colors"
      >
        {name || "Unknown Investor"}
      </Link>
    </div>
  );
};
