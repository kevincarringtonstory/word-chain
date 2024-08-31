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

  const BackspaceIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
    </svg>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1 sm:mb-2">
          {row.map((key) => (
            <button
              key={key}
              className={`
                m-0.5 px-1 py-2 sm:py-3 rounded text-xs sm:text-sm font-bold
                ${
                  key === 'ENTER' || key === 'BACKSPACE'
                    ? 'w-14 sm:w-16 bg-gray-300 text-gray-800'
                    : 'w-7 sm:w-8 bg-gray-200 text-gray-800'
                }
                ${disabledKeys.has(key) ? 'opacity-50 cursor-not-allowed' : ''}
                active:bg-gray-400 transition-colors duration-100
                flex items-center justify-center uppercase
              `}
              onClick={() => handleKeyClick(key)}
              disabled={disabledKeys.has(key)}
            >
              {key === 'BACKSPACE' ? <BackspaceIcon /> : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
