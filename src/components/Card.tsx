import React from 'react';
import { Volume2 } from 'lucide-react';

interface CardProps {
  content: string;
  isSelected: boolean;
  onClick: () => void;
  isMatched: boolean;
  pronunciation?: string;
  type: 'english' | 'bengali';
}

export function Card({ content, isSelected, onClick, isMatched, pronunciation, type }: CardProps) {
  const playPronunciation = () => {
    if (pronunciation) {
      const utterance = new SpeechSynthesisUtterance(pronunciation);
      utterance.lang = type === 'bengali' ? 'bn-BD' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleClick = () => {
    if (!isMatched) {
      playPronunciation();
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-32 h-24 rounded-lg transition-all duration-300 text-2xl font-bold
        transform hover:scale-105
        ${isMatched 
          ? 'bg-gradient-to-br from-green-200 to-green-300 cursor-default shadow-inner' 
          : 'hover:shadow-xl cursor-pointer shadow-lg'}
        ${isSelected 
          ? 'bg-gradient-to-br from-blue-300 to-blue-400 text-white border-2 border-blue-500' 
          : isMatched 
            ? 'text-green-700' 
            : 'bg-gradient-to-br from-white to-gray-50 text-indigo-700 hover:from-indigo-50 hover:to-indigo-100'}
        ${isMatched ? 'opacity-75' : 'opacity-100'}
      `}
      disabled={isMatched}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span>{content}</span>
        { pronunciation && (
          <Volume2 
            size={16}
            className="absolute bottom-2 right-2 text-indigo-600"
          />
        )}
      </div>
    </button>
  );
}