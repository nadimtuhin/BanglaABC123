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

export const useStore = create<StoreState>((set) => ({
  isSettingsModalOpen: false,
  setIsSettingsModalOpen: (isOpen: boolean) =>
    set({ isSettingsModalOpen: isOpen }),
  showAnimalIcons: true,
  setShowAnimalIcons: (value: boolean) => set({ showAnimalIcons: value }),
  showColors: true,
  setShowColors: (value: boolean) => set({ showColors: value }),
  parentNumbers: Array.from({ length: 10 }, (_, i) => i + 1),
  setParentNumbers: (numbers: number[]) => set({ parentNumbers: numbers }),
  selectedRange: "1-10",
  setSelectedRange: (range: string) => set({ selectedRange: range }),
  numberOfCards: 5,
  setNumberOfCards: (count: number) => set({ numberOfCards: count }),
}));
