import React from "react";

interface CongratulationsMessageProps {
  onNextDifficulty: () => void;
  onRestartGame: () => void;
}

export const CongratulationsMessage: React.FC<CongratulationsMessageProps> = ({
  onNextDifficulty,
  onRestartGame,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 z-50">
      <div className="mt-6 text-3xl font-bold text-yellow-500 animate-bounce text-center">
        <p>🎊 Hooray! 🎊</p>
      </div>
      <div className="flex space-x-2">
        <span className="text-6xl">⭐</span>
        <span className="text-6xl">⭐</span>
        <span className="text-6xl">⭐</span>
        <span className="text-6xl">⭐</span>
        <span className="text-6xl">⭐</span>
      </div>

      <button
        onClick={onNextDifficulty}
        className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        🎈 Next Level 🎈
      </button>
      <button
        onClick={onRestartGame}
        className="px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        🔄 Restart Game 🔄
      </button>
    </div>
  );
};
