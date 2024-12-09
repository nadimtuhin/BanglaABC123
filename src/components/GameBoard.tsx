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
  { primary: "blue", secondary: "rose", accent: "purple" },
  { primary: "indigo", secondary: "amber", accent: "green" },
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

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

  const generateGameItems = (
    pair: NumberPair,
    index: number,
    type: "english" | "bengali",
    numberOfCards: number,
    showAnimalIcons: boolean
  ) => {
    const animalIcons = [Dog, Cat, Fish, Bird, Rat, Rabbit, Snail];
    return {
      id: type === "english" ? index : index + numberOfCards,
      content: type === "english" ? pair.english : pair.bengali,
      type,
      isMatched: false,
      pronunciation:
        type === "english" ? pair.englishPronunciation : pair.pronunciation,
      colorTheme: COLOR_THEMES[index % COLOR_THEMES.length],
      animalIcon: showAnimalIcons
        ? animalIcons[index % animalIcons.length]
        : undefined,
    };
  };

export function GameBoard() {
  const [cards, setCards] = useState<GameItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnimalIcons, setShowAnimalIcons] = useLocalStorage<boolean>(
    "showAnimalIcons",
    true
  );
  const [showColors, setShowColors] = useLocalStorage<boolean>(
    "showColors",
    true
  );
  const [parentNumbers, setParentNumbers] = useLocalStorage<number[]>(
    "parentNumbers",
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const [selectedRange, setSelectedRange] = useLocalStorage<string>(
    "selectedRange",
    "1-10"
  );
  const [numberOfCards, setNumberOfCards] = useLocalStorage<number>(
    "numberOfCards",
    5
  );

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



  const getFilteredNumberPairs = (parentNumbers: number[], numberOfCards: number) => {
    return numberPairs
      .filter((pair) => parentNumbers.includes(Number(pair.english)))
      .slice(0, numberOfCards);
  };

  const createGameItems = (
    parentNumbers: number[],
    numberOfCards: number,
    showAnimalIcons: boolean
  ) => {
    const filteredNumberPairs = getFilteredNumberPairs(parentNumbers, numberOfCards);
    return filteredNumberPairs.flatMap((pair, index) => [
      generateGameItems(pair, index, "english", numberOfCards, showAnimalIcons),
      generateGameItems(pair, index, "bengali", numberOfCards, showAnimalIcons),
    ]);
  };

  useEffect(() => {
    const gameItems = createGameItems(parentNumbers, numberOfCards, showAnimalIcons);
    setCards(shuffle(gameItems));
  }, [parentNumbers, showAnimalIcons, numberOfCards]);

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
        setSelectedRange={setSelectedRange}
        handleRangeChange={handleRangeChange}
        numberOfCards={numberOfCards}
        setNumberOfCards={setNumberOfCards}
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
