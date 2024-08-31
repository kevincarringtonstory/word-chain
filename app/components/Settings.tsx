import React, { useState, useEffect } from 'react';

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
  isVisible,
}) => {
  const [animate, setAnimate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setAnimate(false);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleWordLengthChange = (length: number) => {
    setIsClosing(true);
    setAnimate(false);
    setTimeout(() => {
      setIsClosing(false);
      onWordLengthChange(length);
    }, 300);
  };

  useEffect(() => {
    if (isVisible && !isClosing) {
      setTimeout(() => setAnimate(true), 50);
    } else {
      setAnimate(false);
    }
  }, [isVisible, isClosing]);

  if (!isVisible && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ease-out ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-8 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto
          transition-all duration-300 ease-out ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
          <button onClick={handleClose} className="text-2xl sm:text-3xl">
            &times;
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">
            Word Length
          </label>
          <div className="flex space-x-4">
            {[3, 4].map((length) => (
              <button
                key={length}
                className={`text-base sm:text-lg md:text-xl font-bold p-1 sm:p-2 rounded-md shadow-sm ${
                  wordLength === length
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-gray-800 hover:bg-blue-200'
                }`}
                onClick={() => handleWordLengthChange(length)}
              >
                {length} Letters
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
