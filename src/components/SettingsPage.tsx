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

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [start, end] = e.target.value.split("-").map(Number);
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setParentNumbers(numbers);
    setSelectedRange(e.target.value);
  };

  const ranges = Array.from({ length: 10 }, (_, i) => {
    const start = i * 10 + 1;
    const end = start + 9;
    return { value: `${start}-${end}`, label: `${start}-${end}` };
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg z-60 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-violet-800">Settings</h2>
        <div className="mb-6">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={showAnimalIcons}
              onChange={(e) => setShowAnimalIcons(e.target.checked)}
              className="mr-2 h-5 w-5"
            />
            <span className="text-lg">Show Animal Icons</span>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={showColors}
              onChange={(e) => setShowColors(e.target.checked)}
              className="mr-2 h-5 w-5"
            />
            <span className="text-lg">Show Colors</span>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex items-center mb-2">
            <span className="mr-2 text-lg">Number of Cards:</span>
            <select
              value={numberOfCards}
              onChange={(e) => setNumberOfCards(Number(e.target.value))}
              className="border rounded p-2 text-lg"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex items-center mb-2">
            <span className="mr-2 text-lg">Select Range:</span>
            <select
              onChange={handleRangeChange}
              value={selectedRange}
              className="border rounded p-2 text-lg"
            >
              {ranges.map((range, i) => (
                <option key={i} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
