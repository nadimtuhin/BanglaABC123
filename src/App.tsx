import React from "react";
import { GameBoard } from "./components/GameBoard";
import { SettingsPage } from "./components/SettingsPage";
import { Settings } from "lucide-react";
import { useStore } from "./useStore";

function App() {
  const {
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    showAnimalIcons,
    showColors,
    parentNumbers,
    numberOfCards,
  } = useStore();

  return (
    <div className="min-h-screen bg-blue-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-violet-800">BanglaABC123</h1>
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-3 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            aria-label="Settings"
          >
            <Settings size={24} />
          </button>
        </div>

        {isSettingsModalOpen && (
          <SettingsPage onClose={() => setIsSettingsModalOpen(false)} />
        )}

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <GameBoard
            showAnimalIcons={showAnimalIcons}
            showColors={showColors}
            parentNumbers={parentNumbers}
            numberOfCards={numberOfCards}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
