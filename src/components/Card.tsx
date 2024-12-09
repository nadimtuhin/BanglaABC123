    import React from "react";
    import { Volume2 } from "lucide-react";
    
    interface CardProps {
      content: string;
      isSelected: boolean;
      onClick: () => void;
      isMatched: boolean;
      pronunciation?: string;
      type: "english" | "bengali";
      animalIcon?: React.ElementType;
      color?: string; // Added color prop
    }
    
    export function Card({
      content,
      isSelected,
      onClick,
      animalIcon,
      isMatched,
      pronunciation,
      type,
      color = "indigo", // Default color if not provided
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
    
      return (
        <button
          onClick={handleClick}
          className={`
            relative w-32 h-24 rounded-lg transition-all duration-300 text-2xl font-bold
            transform ${isSelected ? 'scale-110' : 'hover:scale-105'}
            ${
              isMatched
                ? `cursor-default shadow-inner`
                : "hover:shadow-xl cursor-pointer shadow-lg"
            }
            ${
              isSelected
                ? `bg-white border-5 border-${color}-500`
                : isMatched
                ? `bg-white opacity-75`
                : `bg-white hover:bg-gray-100`
            }
          `}
          disabled={isMatched}
        >
          <div
            className="absolute left-0 top-0 w-4 h-full rounded-l-lg"
            style={{ backgroundColor: color }}
          ></div>
          <div className="flex flex-col items-center justify-center h-full">
            <span>
              {animalIcon &&
                React.createElement(animalIcon, {
                  className: `w-6 h-6 ${isSelected ? `text-${color}-600` : 'text-gray-700'}`,
                })}{" "}
              {content}
            </span>
            {pronunciation && (
              <Volume2
                size={16}
                className={`absolute bottom-2 right-2 text-${color}-600`}
              />
            )}
          </div>
        </button>
      );
    }
