import React from 'react';

interface GameOverProps {
  onPlayAgain: () => void;
  isWin: boolean;
  attempts: number;
  endWord: string;
}

const GameOver: React.FC<GameOverProps> = ({
  onPlayAgain,
  isWin,
  attempts,
  endWord,
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10">
      <p className="text-xl mb-4 px-4 text-center">
        {isWin
          ? `Congratulations! You've reached the target word in ${attempts} moves!`
          : `Sorry, you've used all 10 attempts. The target word was '${endWord}'.`}
      </p>
      <button
        onClick={onPlayAgain}
        className="w-64 p-2 sm:p-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
