import React from 'react';

interface GameOverProps {
  onPlayAgain: () => void;
  isWin: boolean;
  attempts: number;
  endWord: string;
  optimalSolution: string[];
  startWord: string;
}

const GameOver: React.FC<GameOverProps> = ({
  onPlayAgain,
  isWin,
  attempts,
  endWord,
  optimalSolution,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        {isWin ? 'You win!' : 'Game Over'}
      </h2>
      <p className="mb-4">
        {isWin
          ? `Solved in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}`
          : 'Better luck next time!'}
      </p>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Optimal Solution:</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {optimalSolution.map((word, index) => (
            <span key={index} className="bg-blue-100 px-2 py-1 rounded">
              {word}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={onPlayAgain}
        className="w-full p-2 sm:p-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
