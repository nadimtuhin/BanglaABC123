import React from 'react';

interface SettingsPageProps {
  showAnimalIcons: boolean;
  setShowAnimalIcons: (value: boolean) => void;
  showColors: boolean;
  setShowColors: (value: boolean) => void;
  selectedRange: string;
  setSelectedRange: (value: string) => void;
  handleRangeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SettingsPage({
  showAnimalIcons,
  setShowAnimalIcons,
  showColors,
  setShowColors,
  selectedRange,
  handleRangeChange,
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
        <select
          onChange={handleRangeChange}
          value={selectedRange}
          className="border p-2 rounded mb-4"
        >
          <option value="1-10">1-10</option>
          <option value="11-20">11-20</option>
          <option value="21-30">21-30</option>
          <option value="31-40">31-40</option>
          <option value="41-50">41-50</option>
          <option value="51-60">51-60</option>
          <option value="61-70">61-70</option>
          <option value="71-80">71-80</option>
          <option value="81-90">81-90</option>
          <option value="91-100">91-100</option>
        </select>
      </div>
    </div>
  );
} 