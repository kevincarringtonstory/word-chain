import React from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  disabledKeys?: Set<string>; // Make this prop optional
}

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  onEnter,
  onBackspace,
  disabledKeys = new Set(), // Provide a default empty Set
}) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const handleKeyClick = (key: string) => {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACKSPACE') {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="keyboard mt-4">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              className={`mx-1 px-3 py-2 rounded ${
                key === 'ENTER' || key === 'BACKSPACE'
                  ? 'bg-gray-300 text-gray-800 font-bold'
                  : 'bg-gray-200 text-gray-800'
              } ${
                disabledKeys.has(key) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleKeyClick(key)}
              disabled={disabledKeys.has(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
