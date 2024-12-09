import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { MatchFeedback } from "./MatchFeedback";
import { shuffle } from "../utils/shuffle";
import { createGameItems } from "../utils/gameUtils";
import { GameItem } from "../types";
import { ScoreStars } from "./ScoreStars";
import { useStore } from "../useStore";
import { CongratulationsMessage } from "./CongratulationsMessage";
import Modal from "./Modal";

interface GameBoardProps {
  showAnimalIcons: boolean;
  showColors: boolean;
  parentNumbers: number[];
  numberOfCards: number;
}

export function GameBoard({
  showAnimalIcons,
  showColors,
  parentNumbers,
  numberOfCards,
}: GameBoardProps) {
  const [cards, setCards] = useState<GameItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);
  const [score, setScore] = useState(0);
  const setNumberOfCards = useStore((state) => state.setNumberOfCards);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function resetGame(numberOfCards: number, parentNumbers: number[]) {
    setCards(shuffle(createGameItems(parentNumbers, numberOfCards)));
    setMatches(0);
    setScore(0);
    setSelectedCards([]);
    setIsModalOpen(false);
  }

  useEffect(() => {
    resetGame(numberOfCards, parentNumbers);
  }, [numberOfCards, parentNumbers, showAnimalIcons]);

  useEffect(() => {
    if (matches === numberOfCards) {
      setIsModalOpen(true);
    }
  }, [matches, numberOfCards]);

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

  const handleNextDifficulty = () => {
    let newNumberOfCards = numberOfCards + 1;
    if (newNumberOfCards > 15) {
      newNumberOfCards = 15;
    }
    setNumberOfCards(newNumberOfCards);
    resetGame(newNumberOfCards, parentNumbers);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CongratulationsMessage
          onNextDifficulty={handleNextDifficulty}
          onRestartGame={() => resetGame(numberOfCards, parentNumbers)}
        />
      </Modal>
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium text-violet-800">
              Selected Numbers: {parentNumbers.join(", ")}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium text-violet-800">
                Score:
              </span>
              <ScoreStars score={scoreInFiveStars} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
    </>
  );
}
