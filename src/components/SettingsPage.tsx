import React from "react";

interface SettingsPageProps {
  showAnimalIcons: boolean;
  setShowAnimalIcons: (value: boolean) => void;
  showColors: boolean;
  setShowColors: (value: boolean) => void;
  selectedRange: string;
  setSelectedRange: (value: string) => void;
  handleRangeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  numberOfCards: number;
  setNumberOfCards: (value: number) => void;
}

const ranges = Array.from({ length: 10 }, (_, i) => {
  const start = i * 10 + 1;
  const end = start + 9;
  return { value: `${start}-${end}`, label: `${start}-${end}` };
});

export function SettingsPage({
  showAnimalIcons,
  setShowAnimalIcons,
  showColors,
  setShowColors,
  selectedRange,
  handleRangeChange,
  numberOfCards,
  setNumberOfCards,
}: SettingsPageProps) {
  return (
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
  );
}
