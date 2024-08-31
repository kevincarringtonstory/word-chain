import React from 'react';

interface SettingsProps {
  wordLength: number;
  onWordLengthChange: (length: number) => void;
  onClose: () => void;
  isVisible: boolean;
}

const Settings: React.FC<SettingsProps> = ({
  wordLength,
  onWordLengthChange,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Word Length
          </label>
          <div className="flex space-x-2">
            {[3, 4].map((length) => (
              <button
                key={length}
                className={`px-4 py-2 rounded ${
                  wordLength === length
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => onWordLengthChange(length)}
              >
                {length}
              </button>
            ))}
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;
