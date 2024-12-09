import React from 'react';

interface SettingsPageProps {
  showAnimalIcons: boolean;
  setShowAnimalIcons: (value: boolean) => void;
  showColors: boolean;
  setShowColors: (value: boolean) => void;
}

export function SettingsPage({
  showAnimalIcons,
  setShowAnimalIcons,
  showColors,
  setShowColors,
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
    </div>
  );
} 