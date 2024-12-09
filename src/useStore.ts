import { create } from "zustand";

interface StoreState {
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (isOpen: boolean) => void;
  showAnimalIcons: boolean;
  setShowAnimalIcons: (value: boolean) => void;
  showColors: boolean;
  setShowColors: (value: boolean) => void;
  parentNumbers: number[];
  setParentNumbers: (numbers: number[]) => void;
  selectedRange: string;
  setSelectedRange: (range: string) => void;
  numberOfCards: number;
  setNumberOfCards: (count: number) => void;
}

const loadFromLocalStorage = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useStore = create<StoreState>((set) => ({
  isSettingsModalOpen: loadFromLocalStorage("isSettingsModalOpen", false),
  setIsSettingsModalOpen: (isOpen: boolean) => {
    set({ isSettingsModalOpen: isOpen });
    saveToLocalStorage("isSettingsModalOpen", isOpen);
  },
  showAnimalIcons: loadFromLocalStorage("showAnimalIcons", true),
  setShowAnimalIcons: (value: boolean) => {
    set({ showAnimalIcons: value });
    saveToLocalStorage("showAnimalIcons", value);
  },
  showColors: loadFromLocalStorage("showColors", true),
  setShowColors: (value: boolean) => {
    set({ showColors: value });
    saveToLocalStorage("showColors", value);
  },
  parentNumbers: loadFromLocalStorage("parentNumbers", Array.from({ length: 10 }, (_, i) => i + 1)),
  setParentNumbers: (numbers: number[]) => {
    set({ parentNumbers: numbers });
    saveToLocalStorage("parentNumbers", numbers);
  },
  selectedRange: loadFromLocalStorage("selectedRange", "1-10"),
  setSelectedRange: (range: string) => {
    set({ selectedRange: range });
    saveToLocalStorage("selectedRange", range);
  },
  numberOfCards: loadFromLocalStorage("numberOfCards", 5),
  setNumberOfCards: (count: number) => {
    set({ numberOfCards: count });
    saveToLocalStorage("numberOfCards", count);
  },
}));
