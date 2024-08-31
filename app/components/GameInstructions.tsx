import React, { useState, useEffect } from 'react';

interface GameInstructionsProps {
  isVisible: boolean;
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({
  isVisible,
  onClose,
}) => {
  const [animate, setAnimate] = useState(false);
  const [spinWords, setSpinWords] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setAnimate(false);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match this with your animation duration
  };

  useEffect(() => {
    if (isVisible && !isClosing) {
      // Delay the animation slightly to ensure the component is rendered
      setTimeout(() => setAnimate(true), 50);
      // Trigger word spin animation
      setSpinWords(true);
      // Reset spin animation after a delay
      setTimeout(() => setSpinWords(false), 1000);
    } else {
      setAnimate(false);
    }
  }, [isVisible, isClosing]);

  if (!isVisible && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4
                  transition-all duration-300 ease-out
                  ${
                    animate ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0'
                  }`}
    >
      <div
        className={`bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto
                    transition-all duration-300 ease-out
                    ${
                      animate
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
      >
        <div className="sticky top-0 bg-white z-10 p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold">How to Play</h2>
            <button onClick={handleClose} className="text-2xl sm:text-3xl">
              &times;
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6 space-y-4">
          <div className="space-y-2 sm:space-y-4">
            <p>
              1. Start with the blue word and change one letter at a time to
              reach the green word.
            </p>
            <p>2. Each new word must be a valid English word.</p>
            <p>3. The word length must remain the same throughout.</p>
            <p>4. Reach the green word in the fewest moves possible.</p>
          </div>
          <hr className="my-4 sm:my-6" />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Example:</h3>
            <div className="flex flex-nowrap justify-center items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
              <div
                className={`text-base sm:text-lg md:text-xl font-bold p-1 sm:p-2 bg-blue-100 rounded-md shadow-sm ${
                  spinWords ? 'spin-animation' : ''
                }`}
              >
                CAT
              </div>
              <div className="text-sm sm:text-base">→</div>
              <div
                className={`text-base sm:text-lg md:text-xl font-bold p-1 sm:p-2 bg-blue-100 rounded-md shadow-sm ${
                  spinWords ? 'spin-animation' : ''
                }`}
              >
                COT
              </div>
              <div className="text-sm sm:text-base">→</div>
              <div
                className={`text-base sm:text-lg md:text-xl font-bold p-1 sm:p-2 bg-blue-100 rounded-md shadow-sm ${
                  spinWords ? 'spin-animation' : ''
                }`}
              >
                DOT
              </div>
              <div className="text-sm sm:text-base">→</div>
              <div className="text-base sm:text-lg md:text-xl font-bold p-1 sm:p-2 bg-green-100 rounded-md shadow-sm">
                DOG
              </div>
            </div>
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
