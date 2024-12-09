import React from "react";
import { Volume2 } from "lucide-react";

// Define a more comprehensive color palette
const COLOR_PALETTE = {
  indigo: { bg: 'bg-indigo-600', text: 'text-white', hover: 'hover:bg-indigo-700' },
  blue: { bg: 'bg-blue-600', text: 'text-white', hover: 'hover:bg-blue-700' },
  green: { bg: 'bg-green-600', text: 'text-white', hover: 'hover:bg-green-700' },
  red: { bg: 'bg-red-600', text: 'text-white', hover: 'hover:bg-red-700' },
  purple: { bg: 'bg-purple-600', text: 'text-white', hover: 'hover:bg-purple-700' },
  teal: { bg: 'bg-teal-600', text: 'text-white', hover: 'hover:bg-teal-700' },
  default: { bg: 'bg-gray-600', text: 'text-white', hover: 'hover:bg-gray-700' }
};

interface CardProps {
  content: string;
  isSelected: boolean;
  onClick: () => void;
  isMatched: boolean;
  pronunciation?: string;
  type: "english" | "bengali";
  animalIcon?: React.ElementType;
  color?: keyof typeof COLOR_PALETTE;
}

export function Card({
  content,
  isSelected,
  onClick,
  animalIcon,
  isMatched,
  pronunciation,
  type,
  color = "indigo",
}: CardProps) {
  const playPronunciation = () => {
    if (pronunciation) {
      const utterance = new SpeechSynthesisUtterance(pronunciation);
      utterance.lang = type === "bengali" ? "bn-BD" : "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  const handleClick = () => {
    if (!isMatched) {
      playPronunciation();
    }
    onClick();
  };

  // Use the predefined color palette or default to gray
  const colorScheme = COLOR_PALETTE[color] || COLOR_PALETTE.default;

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-32 h-24 rounded-lg transition-all duration-300 text-2xl font-bold
        transform ${isSelected ? 'scale-110' : 'hover:scale-105'}
        ${
          isMatched
            ? `cursor-default shadow-inner opacity-75`
            : "hover:shadow-xl cursor-pointer shadow-lg"
        }
        bg-white ${!isMatched && colorScheme.hover}
        border-2 ${isSelected ? `border-${colorScheme.bg}` : 'border-transparent'}
      `}
      disabled={isMatched}
    >
      <div
        className={`absolute left-0 top-0 w-4 h-full rounded-l-lg ${colorScheme.bg}`}
      ></div>
      <div className="flex flex-col items-center justify-center h-full">
        <span>
          {animalIcon &&
            React.createElement(animalIcon, {
              className: `w-6 h-6 ${isSelected ? colorScheme.text : 'text-gray-700'}`,
            })}{" "}
          {content}
        </span>
        {pronunciation && (
          <Volume2
            size={16}
            className={`absolute bottom-2 right-2 ${colorScheme.text}`}
          />
        )}
      </div>
    </button>
  );
}