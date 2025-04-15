
interface MatchScoreProps {
  score: number;
}

export const MatchScore = ({ score }: MatchScoreProps) => {
  return (
    <div className="absolute right-3 top-4 flex flex-col items-center bg-primary/10 rounded-md px-2 py-1 border border-primary/20">
      <span className="text-sm font-bold text-primary leading-tight">
        {Math.round(score * 100)}%
      </span>
      <span className="text-xs text-primary/80 font-medium leading-tight">Match</span>
    </div>
  );
};
