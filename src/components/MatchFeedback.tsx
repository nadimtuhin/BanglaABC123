import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface MatchFeedbackProps {
  show: boolean;
  isCorrect: boolean;
}

export function MatchFeedback({ show, isCorrect }: MatchFeedbackProps) {
  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="animate-bounce">
        {isCorrect ? (
          <ThumbsUp className="w-20 h-20 text-green-500 drop-shadow-lg" strokeWidth={2.5} />
        ) : (
          <ThumbsDown className="w-20 h-20 text-red-500 drop-shadow-lg" strokeWidth={2.5} />
        )}
      </div>
    </div>
  );
}