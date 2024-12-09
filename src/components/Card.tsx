import React from "react";
import { Volume2 } from "lucide-react";
import { COLOR_THEMES } from "../utils/gameUtils";

interface CardProps {
  content: string;
  isSelected: boolean;
  onClick: () => void;
  isMatched: boolean;
  pronunciation?: string;
  type: "english" | "bengali";
  animalIcon: React.ElementType;
  color: string;
  showColors: boolean;
  showAnimalIcons: boolean;
}

export function Card({
  content,
  isSelected,
  onClick,
  animalIcon,
  isMatched,
  pronunciation,
  type,
  showColors,
  showAnimalIcons,
  color,
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

  const colorTheme =
    COLOR_THEMES.find((theme) => theme.primary === color) || COLOR_THEMES[0];
  const colorClass = colorTheme.primary;

  return (
    <button
      onClick={isMatched ? undefined : handleClick}
      className={`
        relative w-32 h-32 rounded-lg transition-all duration-300 text-2xl font-bold
        transform ${isSelected ? "scale-110 bg-green-500 text-white" : "hover:scale-105"}
        ${isMatched ? "cursor-default shadow-inner opacity-50" : "hover:shadow-xl cursor-pointer shadow-lg"}
        bg-gray-100 ${!isMatched && showColors ? `hover:${colorClass}` : ""}
        border-2 ${isSelected ? `border-${colorClass}` : "border-transparent"}
        p-4 flex flex-col items-center justify-center
        ${isMatched ? "bg-gray-300" : "hover:bg-yellow-300"}
        m-2
      `}
      disabled={isMatched}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {showAnimalIcons &&
          React.createElement(animalIcon, {
            className: `w-10 h-10 ${isSelected ? "text-yellow-400" : "text-gray-800"}`,
          })}
        <span className={`text-lg ${isSelected ? "text-yellow-400" : "text-gray-900"}`}>
          {content}
        </span>
        {pronunciation && (
          <Volume2
            size={24}
            className={`absolute bottom-2 right-2 ${isSelected ? "text-yellow-400" : "text-gray-800"}`}
          />
        )}
      </div>
    </button>
  );
}
