import { useEffect, useRef, useState } from "react";

interface UseGameTimerOptions {
  timePerQuestion?: number;
  onTimeUp?: () => void;
}

export const useGameTimer = ({
  timePerQuestion = 60,
  onTimeUp,
}: UseGameTimerOptions = {}) => {
  const [questionTime, setQuestionTime] = useState(timePerQuestion);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetQuestionTime = () => {
    setQuestionTime(timePerQuestion);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    stopTimer(); // Prevent duplicates

    intervalRef.current = setInterval(() => {
      setQuestionTime((prev) => {
        if (prev <= 1) {
          stopTimer();
          onTimeUp?.(); // Call timeout handler
          return 0;
        }
        return prev - 1;
      });

      setTotalTime((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => stopTimer(); // cleanup on unmount
  }, []);

  return {
    questionTime,
    totalTime,
    startTimer,
    stopTimer,
    resetQuestionTime,
  };
};
