import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { MatchFeedback } from "./MatchFeedback";
import { numberPairs } from "../data/numbers";
import { shuffle } from "../utils/shuffle";
import { Dog, Cat, Rabbit, Snail, Rat, Fish, Bird } from "lucide-react";
import { SettingsPage } from "./SettingsPage";

// Enhanced color palette with complementary colors
const COLOR_THEMES = [
  { primary: "indigo", secondary: "pink", accent: "purple" },
  { primary: "teal", secondary: "orange", accent: "green" },
  { primary: "blue", secondary: "yellow", accent: "indigo" },
  { primary: "blue", secondary: "rose", accent: "purple" }, // Changed from emerald
  { primary: "indigo", secondary: "amber", accent: "green" }, // Changed from violet
];

interface GameItem {
  id: number;
  content: string;
  type: "english" | "bengali";
  isMatched: boolean;
  pronunciation?: string;
  animalIcon?: React.ElementType;
  colorTheme: { primary: string; secondary: string; accent: string };
}

interface NumberPair {
  number: number;
  english: string;
  bengali: string;
  pronunciation: string;
  englishPronunciation: string;
}

export function GameBoard() {
  const [cards, setCards] = useState<GameItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnimalIcons, setShowAnimalIcons] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [parentNumbers, setParentNumbers] = useState<number[]>(() => {
    const [start, end] = "1-10".split("-").map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });
  const [selectedRange, setSelectedRange] = useState<string>("1-10");

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(e.target.value);
    const [start, end] = e.target.value.split("-").map(Number);
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setParentNumbers(numbers);
    // Reset game state when range changes
    setCards([]);
    setSelectedCards([]);
    setMatches(0);
    setScore(0);
    setShowFeedback(false);
    setIsCorrectMatch(false);
  };

  useEffect(() => {
    const animalIcons = [Dog, Cat, Fish, Bird, Rat, Rabbit, Snail];

    const filteredNumberPairs = (numberPairs as NumberPair[]).filter((pair) =>
      parentNumbers.includes(Number(pair.english))
    );

    const gameItems: GameItem[] = [
      ...filteredNumberPairs.map((pair, index) => ({
        id: index,
        content: pair.english,
        type: "english" as const,
        isMatched: false,
        pronunciation: pair.englishPronunciation,
        colorTheme: COLOR_THEMES[index % COLOR_THEMES.length],
        animalIcon: showAnimalIcons
          ? animalIcons[index % animalIcons.length]
          : undefined,
      })),
      ...filteredNumberPairs.map((pair, index) => ({
        id: index + filteredNumberPairs.length,
        content: pair.bengali,
        type: "bengali" as const,
        isMatched: false,
        pronunciation: pair.pronunciation,
        colorTheme: COLOR_THEMES[index % COLOR_THEMES.length],
        animalIcon: showAnimalIcons
          ? animalIcons[index % animalIcons.length]
          : undefined,
      })),
    ];
    setCards(shuffle(gameItems));
  }, [parentNumbers, showAnimalIcons]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      const isMatch =
        firstCard.id % parentNumbers.length ===
          secondCard.id % parentNumbers.length &&
        firstCard.type !== secondCard.type;

      setIsCorrectMatch(isMatch);
      setShowFeedback(true);

      if (isMatch) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatches((m) => m + 1);
        setScore((prevScore) => prevScore + 1);
      }

      const timer = setTimeout(() => {
        setShowFeedback(false);
        setSelectedCards([]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedCards, parentNumbers.length, cards]);

  const handleCardClick = (index: number) => {
    if (selectedCards.length >= 2) return;
    if (selectedCards.includes(index)) return;
    if (cards[index].isMatched) return;

    setSelectedCards((prev) => [...prev, index]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <SettingsPage
        showAnimalIcons={showAnimalIcons}
        setShowAnimalIcons={setShowAnimalIcons}
        showColors={showColors}
        setShowColors={setShowColors}
        selectedRange={selectedRange}
        handleRangeChange={handleRangeChange}
      />
      <div className="text-center mb-8">
        <p>Selected Numbers: {parentNumbers.join(", ")}</p>
        <p className="text-gray-600 text-lg mb-4">
          Score:{" "}
          {Array.from({ length: score }, (_, i) => (
            <span key={i} className="text-yellow-500">
              ⭐
            </span>
          ))}
        </p>
        {matches === parentNumbers.length && (
          <div className="mt-6 text-2xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
              🎉 Congratulations! You've matched all numbers! 🎉
            </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-6 bg-white/50 rounded-2xl backdrop-blur-sm shadow-xl">
        {cards.map((card, index) => (
          <Card
            key={index}
            content={card.content}
            isSelected={selectedCards.includes(index)}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
            pronunciation={card.pronunciation}
            type={card.type}
            color={
              showColors
                ? (card.colorTheme.primary as
                    | "indigo"
                    | "purple"
                    | "teal"
                    | "green"
                    | "blue")
                : "default"
            }
            animalIcon={showAnimalIcons ? card.animalIcon : undefined}
          />
        ))}
      </div>
      <MatchFeedback show={showFeedback} isCorrect={isCorrectMatch} />
    </div>
  );
}
