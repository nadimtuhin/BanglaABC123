 // Start of Selection
 import React, { useState, useEffect } from "react";
 import { Card } from "./Card";
 import { MatchFeedback } from "./MatchFeedback";
 import { numberPairs } from "../data/numbers";
 import { shuffle } from "../utils/shuffle";
 
 interface GameItem {
   id: number;
   content: string;
   type: "english" | "bengali";
   isMatched: boolean;
   pronunciation?: string;
 }
 
 export function GameBoard() {
   const [cards, setCards] = useState<GameItem[]>([]);
   const [selectedCards, setSelectedCards] = useState<number[]>([]);
   const [matches, setMatches] = useState(0);
   const [showFeedback, setShowFeedback] = useState(false);
   const [isCorrectMatch, setIsCorrectMatch] = useState(false);
   const [score, setScore] = useState(0);
 
   useEffect(() => {
     const gameItems: GameItem[] = [
       ...numberPairs.map((pair, index) => ({
         id: index,
         content: pair.english,
         type: "english" as const,
         isMatched: false,
         pronunciation: pair.englishPronunciation,
       })),
       ...numberPairs.map((pair, index) => ({
         id: index + numberPairs.length,
         content: pair.bengali,
         type: "bengali" as const,
         isMatched: false,
         pronunciation: pair.pronunciation,
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
 
   return (
     <div className="w-full max-w-4xl mx-auto p-4">
       <div className="text-center mb-8">
         <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
           Match Bengali Numbers
         </h1>
         <p className="text-gray-700 text-lg mb-4">
           Match the English numbers with their Bengali counterparts
         </p>
         <p className="text-gray-600 text-sm">
           Click the speaker icon to hear the pronunciation
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
           />
         ))}
       </div>
       <MatchFeedback show={showFeedback} isCorrect={isCorrectMatch} />
     </div>
   );
 }
