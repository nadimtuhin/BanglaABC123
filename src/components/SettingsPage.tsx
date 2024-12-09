import React from "react";
import { useStore } from "../useStore";

interface SettingsPageProps {
  onClose: () => void;
}

export function SettingsPage({ onClose }: SettingsPageProps) {
  const {
    showAnimalIcons,
    setShowAnimalIcons,
    showColors,
    setShowColors,
    setParentNumbers,
    selectedRange,
    setSelectedRange,
    numberOfCards,
    setNumberOfCards,
  } = useStore();

  const handleRangeChange = (start: number, end: number) => {
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setParentNumbers(numbers);
    setSelectedRange(`${start}-${end}`);
  };

  const ranges = Array.from({ length: 10 }, (_, i) => {
    const start = i * 10 + 1;
    const end = start + 9;
    return { start, end, label: `${start}-${end}` };
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg z-60 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-violet-800">Settings</h2>
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={showAnimalIcons}
              onChange={(e) => setShowAnimalIcons(e.target.checked)}
              className="mr-2 h-5 w-5"
            />
            <span className="text-base md:text-lg">Show Animal Icons</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={showColors}
              onChange={(e) => setShowColors(e.target.checked)}
              className="mr-2 h-5 w-5"
            />
            <span className="text-base md:text-lg">Show Colors</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <span className="mr-2 text-base md:text-lg">Number of Cards:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={numberOfCards}
              onChange={(e) => setNumberOfCards(Number(e.target.value))}
              className="w-full"
            />
            <span className="ml-2 text-base md:text-lg">{numberOfCards}</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <span className="mr-2 text-base md:text-lg">Select Range:</span>
            <div className="flex flex-wrap space-x-2">
              {ranges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handleRangeChange(range.start, range.end)}
                  className={`border rounded-lg p-2 text-base md:text-lg transition-colors duration-200 shadow-md transform hover:scale-105 ${selectedRange === `${range.start}-${range.end}` ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-200'} m-1`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </label>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
}
