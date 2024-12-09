import React from "react";
import { Volume2 } from "lucide-react";
import { COLOR_THEMES } from "../utils/gameUtils"; // Import COLOR_THEMES

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

  // Use the predefined color from COLOR_THEMES
  const colorTheme =
    COLOR_THEMES.find((theme) => theme.primary === color) || COLOR_THEMES[0];
  const colorClass = colorTheme.primary; // Use primary color from the theme

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-32 h-24 rounded-lg transition-all duration-300 text-2xl font-bold
        transform ${isSelected ? "scale-110" : "hover:scale-105"}
        ${
          isMatched
            ? "cursor-default shadow-inner opacity-75"
            : "hover:shadow-xl cursor-pointer shadow-lg"
        }
        bg-white ${!isMatched && showColors ? `hover:${colorClass}` : ""}
        border-2 ${isSelected ? `border-${colorClass}` : "border-transparent"}
      `}
      disabled={isMatched}
    >
      <div
        className={`absolute left-0 top-0 w-4 h-full rounded-l-lg ${colorClass}`}
      ></div>
      <div className="flex flex-col items-center justify-center h-full">
        <span>
          {showAnimalIcons &&
            React.createElement(animalIcon, {
              className: `w-6 h-6 ${
                isSelected ? "text-white" : "text-gray-700"
              }`,
            })}{" "}
          {content}
        </span>
        {pronunciation && (
          <Volume2
            size={16}
            className={`absolute bottom-2 right-2 ${
              isSelected ? "text-white" : "text-gray-700"
            }`}
          />
        )}
      </div>
    </button>
  );
}
