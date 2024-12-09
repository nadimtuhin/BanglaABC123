import { NumberPair } from "../data/numbers";

import {
  Bird,
  Bug,
  Dog,
  Fish,
  Mouse,
  Rabbit,
  Rat,
  Shell,
  Snail,
  Squirrel,
  Turtle,
} from "lucide-react";

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

const ANIMAL_ICONS = [
  Dog,
  Cat,
  Fish,
  Bird,
  Rat,
  Rabbit,
  Snail,
  Rabbit,
  Shell,
  Squirrel,
  Bug,
  Mouse,
  Turtle,
];

export const generateGameItems = (
  pair: NumberPair,
  index: number,
  type: "english" | "bengali",
  numberOfCards: number,
  showAnimalIcons: boolean
): GameItem => {
  return {
    id: type === "english" ? index : index + numberOfCards,
    content: type === "english" ? pair.english : pair.bengali,
    value: pair.english,
    type,
    isMatched: false,
    pronunciation:
      type === "english" ? pair.englishPronunciation : pair.pronunciation,
    colorTheme: COLOR_THEMES[index % COLOR_THEMES.length],
    animalIcon: showAnimalIcons
      ? ANIMAL_ICONS[index % ANIMAL_ICONS.length]
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
