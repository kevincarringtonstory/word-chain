import React from 'react';

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              How to Play Word Chain
            </h2>
            <button onClick={onClose} className="text-2xl sm:text-3xl">
              &times;
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6 space-y-4">
          <div className="space-y-2 sm:space-y-4">
            <p>1. Start with the given word and change one letter at a time.</p>
            <p>
              2. Each new word must be a valid 3-letter word in the dictionary.
            </p>
            <p>3. Try to reach the target word in 10 moves or less.</p>
          </div>
          <hr className="my-4 sm:my-6" />
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Example:</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-green-500 text-white p-2 sm:p-4 rounded text-lg sm:text-2xl">
                CAT
              </div>
              <div className="bg-blue-500 text-white p-2 sm:p-4 rounded text-lg sm:text-2xl">
                COT
              </div>
              <div className="bg-blue-500 text-white p-2 sm:p-4 rounded text-lg sm:text-2xl">
                DOT
              </div>
              <div className="bg-blue-500 text-white p-2 sm:p-4 rounded text-lg sm:text-2xl">
                DOG
              </div>
            </div>
            <p className="text-center text-lg sm:text-xl mb-4 sm:mb-6">
              CAT → COT → DOT → DOG
            </p>
          </div>
          <hr className="my-4 sm:my-6" />
          <p className="text-center font-bold text-xl sm:text-2xl">
            Good luck!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameInstructions;
