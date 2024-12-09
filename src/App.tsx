import React, { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { SettingsPage } from "./components/SettingsPage";
import { Settings } from "lucide-react";

function App() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
        >
          <Settings size={24} />
        </button>

        {isSettingsModalOpen && (
          <SettingsPage onClose={() => setIsSettingsModalOpen(false)} />
        )}

        <GameBoard />
      </div>
    </div>
  );
}

export default App;
