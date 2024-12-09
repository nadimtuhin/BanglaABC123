import React from 'react';

interface CongratulationsMessageProps {
  onNextDifficulty: () => void;
}

export const CongratulationsMessage: React.FC<CongratulationsMessageProps> = ({ onNextDifficulty }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mt-6 text-2xl font-bold text-emerald-500 animate-bounce">
        🎉 Congratulations! You've matched all numbers! 🎉
      </div>

      <button
        onClick={onNextDifficulty}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        Next Difficulty
      </button>
    </div>
  );
}; 