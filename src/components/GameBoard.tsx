import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { MatchFeedback } from "./MatchFeedback";
import { shuffle } from "../utils/shuffle";
import { createGameItems } from "../utils/gameUtils";
import { GameItem } from "../types";
import { ScoreStars } from "./ScoreStars";
import { useLocalStorage } from "./useLocalStorage";

export function GameBoard() {
  const [showAnimalIcons] = useLocalStorage("showAnimalIcons", true);
  const [showColors] = useLocalStorage("showColors", true);
  const [parentNumbers] = useLocalStorage(
    "parentNumbers",
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const [numberOfCards] = useLocalStorage("numberOfCards", 5);

  const [cards, setCards] = useState<GameItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);
  const [score, setScore] = useState(0);

  function resetGame(numberOfCards: number, parentNumbers: number[]) {
    setCards(shuffle(createGameItems(parentNumbers, numberOfCards)));
    setMatches(0);
    setScore(0);
    setSelectedCards([]);
  }

  useEffect(() => {
    resetGame(numberOfCards, parentNumbers);
  }, [numberOfCards, parentNumbers, showAnimalIcons]);

  const handleCardClick = (index: number) => {
    if (
      selectedCards.length < 2 &&
      !selectedCards.includes(index) &&
      !cards[index].isMatched
    ) {
      const newSelectedCards = [...selectedCards, index];
      setSelectedCards(newSelectedCards);

      if (newSelectedCards.length !== 2) {
        return;
      }

      const [first, second] = newSelectedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      const isMatch = firstCard.value === secondCard.value;

      setIsCorrectMatch(isMatch);
      setShowFeedback(true);

      if (isMatch) {
        const updatedCards = cards.map((card, index) => {
          const isMatchedCard = index === first || index === second;
          return isMatchedCard ? { ...card, isMatched: true } : card;
        });

        setCards(updatedCards);
        setMatches((prevMatches) => prevMatches + 1);
        setScore((prevScore) => prevScore + 1);
      }

      setTimeout(() => {
        setShowFeedback(false);
        setSelectedCards([]);
      }, 1000);
    }
  };

  const scoreInFiveStars = Math.round(score / (numberOfCards / 5));

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <p className="text-lg font-semibold">
          Selected Numbers: {parentNumbers.join(", ")}
        </p>
        <p className="text-gray-600 text-lg mb-4">
          Score: <ScoreStars score={scoreInFiveStars} />
        </p>
        <button
          onClick={() => resetGame(numberOfCards, parentNumbers)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Restart Game
        </button>
        {matches === parentNumbers.length && (
          <div className="mt-6 text-2xl font-bold text-green-500">
            🎉 Congratulations! You've matched all numbers! 🎉
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-6 bg-white rounded-2xl shadow-xl">
        {cards.map((card, index) => (
          <Card
            key={index}
            content={card.content}
            isSelected={selectedCards.includes(index)}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
            pronunciation={card.pronunciation}
            type={card.type}
            showColors={showColors}
            showAnimalIcons={showAnimalIcons}
            color={card.colorTheme.primary}
            animalIcon={card.animalIcon as React.ElementType}
          />
        ))}
      </div>
      <MatchFeedback show={showFeedback} isCorrect={isCorrectMatch} />
    </div>
  );
}
