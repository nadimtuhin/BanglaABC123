import { NumberPair } from "../data/numbers";

import { Bird, Dog, Fish, Rabbit, Rat, Snail } from "lucide-react";

import { Cat } from "lucide-react";
import { numberPairs } from "../data/numbers";
import { GameItem } from "../types";

const COLOR_THEMES = [
  { primary: "indigo", secondary: "pink", accent: "purple" },
  { primary: "teal", secondary: "orange", accent: "green" },
  { primary: "blue", secondary: "yellow", accent: "indigo" },
  { primary: "blue", secondary: "rose", accent: "purple" },
  { primary: "indigo", secondary: "amber", accent: "green" },
];

export const generateGameItems = (
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

export const getFilteredNumberPairs = (
  parentNumbers: number[],
  numberOfCards: number
) => {
  return numberPairs
    .filter((pair) => parentNumbers.includes(Number(pair.english)))
    .slice(0, numberOfCards);
};

export const createGameItems = (
  parentNumbers: number[],
  numberOfCards: number,
  showAnimalIcons: boolean
) => {
  const filteredNumberPairs = getFilteredNumberPairs(
    parentNumbers,
    numberOfCards
  );
  return filteredNumberPairs.flatMap((pair, index) => [
    generateGameItems(pair, index, "english", numberOfCards, showAnimalIcons),
    generateGameItems(pair, index, "bengali", numberOfCards, showAnimalIcons),
  ]);
};

export const resetGameState = (
  setCards: React.Dispatch<React.SetStateAction<GameItem[]>>,
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>,
  setMatches: React.Dispatch<React.SetStateAction<number>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCorrectMatch: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setCards([]);
  setSelectedCards([]);
  setMatches(0);
  setScore(0);
  setShowFeedback(false);
  setIsCorrectMatch(false);
};
