
export const simulateProgress = (
  setProgressFn: React.Dispatch<React.SetStateAction<number>>, 
  onComplete?: () => void,
  startAt: number = 0,
  duration: number = 2000 // Reduced from 3000 to 2000 ms
): () => void => {
  let start = startAt;
  const interval = 50; // Reduced interval for faster progression
  const increment = (100 - startAt) / (duration / interval);
  
  const timer = setInterval(() => {
    start += increment;
    const roundedProgress = Math.min(Math.round(start), 99);
    setProgressFn(roundedProgress);
    
    if (roundedProgress >= 99) {
      clearInterval(timer);
      if (onComplete) onComplete();
    }
  }, interval);
  
  return () => clearInterval(timer);
};
