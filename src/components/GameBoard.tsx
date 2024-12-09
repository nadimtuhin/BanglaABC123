    // Start of Selection
    import React, { useState, useEffect } from "react";
    import { Card } from "./Card";
    import { MatchFeedback } from "./MatchFeedback";
    import { numberPairs } from "../data/numbers";
    import { shuffle } from "../utils/shuffle";
    import { Dog, Cat, Rabbit, Snail, Rat, Fish, Bird } from 'lucide-react';
    import { SettingsPage } from './SettingsPage';
    
    // Enhanced color palette with complementary colors
    const COLOR_THEMES = [
      { primary: 'indigo', secondary: 'pink', accent: 'purple' },
      { primary: 'teal', secondary: 'orange', accent: 'green' },
      { primary: 'blue', secondary: 'yellow', accent: 'indigo' },
      { primary: 'emerald', secondary: 'rose', accent: 'cyan' },
      { primary: 'violet', secondary: 'amber', accent: 'fuchsia' }
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
    
    export function GameBoard() {
      const [cards, setCards] = useState<GameItem[]>([]);
      const [selectedCards, setSelectedCards] = useState<number[]>([]);
      const [matches, setMatches] = useState(0);
      const [showFeedback, setShowFeedback] = useState(false);
      const [isCorrectMatch, setIsCorrectMatch] = useState(false);
      const [score, setScore] = useState(0);
      const [showAnimalIcons, setShowAnimalIcons] = useState(true);
      const [showColors, setShowColors] = useState(true);
    
      const handleColorsCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowColors(e.target.checked);
      };
    
      useEffect(() => {
        const animalIcons = [Dog, Cat, Fish, Bird, Rat, Rabbit, Snail];
        
        const gameItems: GameItem[] = [
          ...numberPairs.map((pair, index) => ({
            id: index,
            content: pair.english,
            type: "english" as const,
            isMatched: false,
            pronunciation: pair.englishPronunciation,
            colorTheme: COLOR_THEMES[index % COLOR_THEMES.length],
            animalIcon: animalIcons[index % animalIcons.length],
          })),
          ...numberPairs.map((pair, index) => ({
            id: index + numberPairs.length,
            content: pair.bengali,
            type: "bengali" as const,
            isMatched: false,
            pronunciation: pair.pronunciation,
            colorTheme: COLOR_THEMES[index % COLOR_THEMES.length],
            animalIcon: animalIcons[index % animalIcons.length],
          })),
        ];
        setCards(shuffle(gameItems));
      }, []);
    
      useEffect(() => {
        if (selectedCards.length === 2) {
          const [first, second] = selectedCards;
          const firstCard = cards[first];
          const secondCard = cards[second];
        
          const isMatch =
            firstCard.id % numberPairs.length ===
              secondCard.id % numberPairs.length &&
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
        
          setTimeout(() => {
            setShowFeedback(false);
            setSelectedCards([]);
          }, 1000);
        }
      }, [selectedCards]);
    
      const handleCardClick = (index: number) => {
        if (
          selectedCards.length < 2 &&
          !selectedCards.includes(index) &&
          !cards[index].isMatched
        ) {
          setSelectedCards([...selectedCards, index]);
        }
      };
    
      const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowAnimalIcons(e.target.checked);
      };
    
      return (
        <div className="w-full max-w-4xl mx-auto p-4">
          <SettingsPage
            showAnimalIcons={showAnimalIcons}
            setShowAnimalIcons={setShowAnimalIcons}
            showColors={showColors}
            setShowColors={setShowColors}
          />
          <div className="text-center mb-8">
            <h1 className={`
              text-4xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-indigo-600 
              to-indigo-600 
              mb-4 flex items-center justify-center
            `}>
              {showAnimalIcons && <Dog className={`w-8 h-8 mr-2 text-${showColors ? cards[0]?.colorTheme.accent : 'gray'}-600`} />}
              Match Bengali Numbers
              {showAnimalIcons && <Cat className={`w-8 h-8 ml-2 text-${showColors ? cards[0]?.colorTheme.accent : 'gray'}-600`} />}
            </h1>
            <p className="text-gray-700 text-lg mb-4">
              Match the English numbers with their Bengali counterparts
            </p>
            <p className="text-gray-600 text-lg mb-4">
              Score: {Array.from({ length: score }, (_, i) => (
                <span key={i} className="text-yellow-500">⭐</span>
              ))}
            </p>
            {matches === numberPairs.length && (
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