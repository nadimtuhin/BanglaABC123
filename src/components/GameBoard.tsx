import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { MatchFeedback } from "./MatchFeedback";
import { shuffle } from "../utils/shuffle";
import { createGameItems, resetGameState } from "../utils/gameUtils";
import { SettingsPage } from "./SettingsPage";
import { GameItem } from "../types";
import { useLocalStorage } from "./useLocalStorage";

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
    const [start, end] = e.target.value.split("-").map(Number);
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setParentNumbers(numbers);
    setSelectedRange(e.target.value);
    resetGameState(
      setCards,
      setSelectedCards,
      setMatches,
      setScore,
      setShowFeedback,
      setIsCorrectMatch
    );
  };

  useEffect(() => {
    const gameItems = createGameItems(
      parentNumbers,
      numberOfCards,
      showAnimalIcons
    );
    setCards(shuffle(gameItems));
  }, [parentNumbers, showAnimalIcons, numberOfCards]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      const isMatch = firstCard?.content === secondCard?.content;

      setIsCorrectMatch(isMatch);
      setShowFeedback(true);

      if (isMatch) {
        const updatedCards = cards.map((card, idx) =>
          idx === first || idx === second ? { ...card, isMatched: true } : card
        );
        setCards(updatedCards);
        setMatches((m) => m + 1);
        setScore((prevScore) => prevScore + 1);
      }

      const timer = setTimeout(() => {
        setShowFeedback(false);
        setSelectedCards([]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedCards, cards]);

  const handleCardClick = (index: number) => {
    if (
      selectedCards.length < 2 &&
      !selectedCards.includes(index) &&
      !cards[index].isMatched
    ) {
      setSelectedCards((prev) => [...prev, index]);
    }
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
            color={showColors ? card.colorTheme.primary : "default"}
            animalIcon={showAnimalIcons ? card.animalIcon : undefined}
          />
        ))}
      </div>
      <MatchFeedback show={showFeedback} isCorrect={isCorrectMatch} />
    </div>
  );
}
