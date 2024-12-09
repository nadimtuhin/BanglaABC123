import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { MatchFeedback } from "./MatchFeedback";
import { shuffle } from "../utils/shuffle";
import { createGameItems, resetGameState } from "../utils/gameUtils";
import { SettingsPage } from "./SettingsPage";
import { GameItem } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { ScoreStars } from "./ScoreStars";

export function GameBoard() {
  const [cards, setCards] = useState<GameItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnimalIcons, setShowAnimalIcons] = useLocalStorage(
    "showAnimalIcons",
    true
  );
  const [showColors, setShowColors] = useLocalStorage("showColors", true);
  const [parentNumbers, setParentNumbers] = useLocalStorage(
    "parentNumbers",
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const [selectedRange, setSelectedRange] = useLocalStorage(
    "selectedRange",
    "1-10"
  );
  const [numberOfCards, setNumberOfCards] = useLocalStorage("numberOfCards", 5);

  useEffect(() => {
    setCards(
      shuffle(createGameItems(parentNumbers, numberOfCards, showAnimalIcons))
    );
  }, [numberOfCards, parentNumbers, showAnimalIcons]);

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

  const initializeCards = () => {
    const gameItems = createGameItems(
      parentNumbers,
      numberOfCards,
      showAnimalIcons
    );
    if (cards.length === 0 || gameItems.length !== cards.length) {
      setCards(shuffle(gameItems));
    }
  };

  const handleCardClick = (index: number) => {
    if (
      selectedCards.length < 2 &&
      !selectedCards.includes(index) &&
      !cards[index].isMatched
    ) {
      const newSelectedCards = [...selectedCards, index];
      setSelectedCards(newSelectedCards);

      if (newSelectedCards.length === 2) {
        const [first, second] = newSelectedCards;
        const firstCard = cards[first];
        const secondCard = cards[second];

        const isMatch = firstCard.value === secondCard.value;

        setIsCorrectMatch(isMatch);
        setShowFeedback(true);

        if (isMatch) {
          // Create a new array of cards with updated match status
          const updatedCards = cards.map((card, index) => {
            // Check if the current card is one of the matched cards
            const isMatchedCard = index === first || index === second;
            // Return a new card object with isMatched set to true if it's a matched card
            return isMatchedCard ? { ...card, isMatched: true } : card;
          });

          // Update the state with the new cards
          setCards(updatedCards);
          // Increment the match count
          setMatches((prevMatches) => prevMatches + 1);
          // Increment the score
          setScore((prevScore) => prevScore + 1);
        }

        setTimeout(() => {
          setShowFeedback(false);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  if (cards.length === 0) {
    initializeCards();
  }

  const scoreInFiveStars = Math.round(score / (numberOfCards / 5));

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
          Score: <ScoreStars score={scoreInFiveStars} />
        </p>
        <button
          onClick={() => {
            resetGameState(
              setCards,
              setSelectedCards,
              setMatches,
              setScore,
              setShowFeedback,
              setIsCorrectMatch
            );
            initializeCards();
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Restart Game
        </button>
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
