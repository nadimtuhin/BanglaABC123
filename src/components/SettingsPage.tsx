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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg z-60">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showAnimalIcons}
                onChange={(e) => setShowAnimalIcons(e.target.checked)}
                className="mr-2"
              />
              Show Animal Icons
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showColors}
                onChange={(e) => setShowColors(e.target.checked)}
                className="mr-2"
              />
              Show Colors
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <span className="mr-2">Number of Cards:</span>
              <select
                value={numberOfCards}
                onChange={(e) => setNumberOfCards(Number(e.target.value))}
                className="border rounded p-1"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <span className="mr-2">Select Range:</span>
              <select
                onChange={handleRangeChange}
                value={selectedRange}
                className="border rounded p-1"
              >
                {ranges.map((range, i) => (
                  <option key={i} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
