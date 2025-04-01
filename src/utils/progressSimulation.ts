
/**
 * Utility function to simulate progress for visual feedback
 * @param setProgressFn - Function to update progress state
 * @param onComplete - Optional callback when progress completes
 * @param startAt - Optional starting percentage (default: 0)
 * @param duration - Optional total duration in ms (default: 3000)
 * @returns Function to stop the simulation
 */
export const simulateProgress = (
  setProgressFn: React.Dispatch<React.SetStateAction<number>>, 
  onComplete?: () => void,
  startAt: number = 0,
  duration: number = 3000
): () => void => {
  let start = startAt;
  const interval = 100;
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
