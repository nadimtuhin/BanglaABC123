import React from "react";
import { GameBoard } from "./components/GameBoard";
import { SettingsPage } from "./components/SettingsPage";
import { useLocalStorage } from "./components/useLocalStorage";

function App() {
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

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [start, end] = e.target.value.split("-").map(Number);
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setParentNumbers(numbers);
    setSelectedRange(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8">
      <div className="w-full max-w-4xl mx-auto">
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
        <GameBoard
          showAnimalIcons={showAnimalIcons}
          showColors={showColors}
          parentNumbers={parentNumbers}
          numberOfCards={numberOfCards}
        />
      </div>
    </div>
  );
}

export default App;
