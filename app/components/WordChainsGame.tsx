'use client';

import React, { useState, useEffect } from 'react';

// Import a dictionary of words (you'll need to create this file)
import dictionary from '@/app/utils/dictionary';

import { findWordChain } from '@/app/utils/wordChainSolver';

interface GameState {
  startWord: string;
  endWord: string;
  currentWord: string;
  inputWord: string;
  attempts: string[];
  message: string;
  gameOver: boolean;
  solution: string[]; // This is correct
}

const WordChainsGame: React.FC = () => {
  const [state, setState] = useState<GameState>({
    startWord: '',
    endWord: '',
    currentWord: '',
    inputWord: '',
    attempts: [],
    message: '',
    gameOver: false,
    solution: [], // This is correct
  });

  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const initialState = getInitialState();
    setState(initialState);
  }, []);

  const getInitialState = (): GameState => {
    const threeLetterWords = dictionary.filter((word) => word.length === 3);
    let start, end, solution;

    do {
      start =
        threeLetterWords[Math.floor(Math.random() * threeLetterWords.length)];
      end =
        threeLetterWords[Math.floor(Math.random() * threeLetterWords.length)];
      solution = findWordChain(start, end, dictionary);
    } while (start === end || !solution);

    return {
      startWord: start,
      endWord: end,
      currentWord: start,
      inputWord: '',
      attempts: [],
      message: '',
      gameOver: false,
      solution: solution || [], // This is correct
    };
  };

  const isValidWord = (word: string) => dictionary.includes(word);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, inputWord: e.target.value.toLowerCase() }));
  };

  const handleSubmit = () => {
    const { currentWord, inputWord, endWord, attempts } = state;

    if (inputWord.length !== currentWord.length) {
      setState((prev) => ({
        ...prev,
        message: 'The word must be the same length as the current word.',
      }));
      return;
    }
    if (
      inputWord.split('').filter((char, i) => char !== currentWord[i])
        .length !== 1
    ) {
      setState((prev) => ({
        ...prev,
        message: 'You can only change one letter at a time.',
      }));
      return;
    }
    if (!isValidWord(inputWord)) {
      setState((prev) => ({
        ...prev,
        message: "That's not a valid word in our dictionary.",
      }));
      return;
    }

    const newAttempts = [...attempts, inputWord];
    const gameOver = inputWord === endWord || newAttempts.length >= 10;

    setState((prev) => ({
      ...prev,
      currentWord: inputWord,
      inputWord: '',
      attempts: newAttempts,
      message: gameOver
        ? inputWord === endWord
          ? `Congratulations! You've reached the target word in ${newAttempts.length} moves!`
          : `Sorry, you've used all 10 attempts. The target word was '${endWord}'.`
        : 'Valid word! Keep going.',
      gameOver: gameOver,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const startNewGame = () => {
    setState(getInitialState());
  };

  const renderKeyboard = () => {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
    ];

    return (
      <div className="mt-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-2">
            {row.map((key) => (
              <button
                key={key}
                className="mx-1 p-2 bg-gray-200 rounded text-sm font-bold"
                onClick={() => {
                  if (key === '⌫') {
                    setState((prev) => ({
                      ...prev,
                      inputWord: prev.inputWord.slice(0, -1),
                    }));
                  } else if (key === 'ENTER') {
                    handleSubmit();
                  } else {
                    setState((prev) => ({
                      ...prev,
                      inputWord: prev.inputWord + key.toLowerCase(),
                    }));
                  }
                }}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="font-sans max-w-md mx-auto p-5 bg-white">
      <header className="flex justify-between items-center mb-4 pb-2 border-b">
        <button
          className="text-gray-600 font-bold text-xl"
          onClick={() => setShowInstructions(true)}
        >
          ?
        </button>
        <h1 className="text-3xl font-bold">WORD CHAIN</h1>
        <div className="flex">
          <button className="mr-2">📊</button>
          <button>⚙️</button>
        </div>
      </header>

      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-sm">
            <h2 className="text-xl font-bold mb-2">How to Play</h2>
            <p>
              Change one letter at a time to transform the start word into the
              end word.
            </p>
            <p className="mt-2">
              You have 10 attempts to reach the target word.
            </p>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={() => setShowInstructions(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <div className="mb-4">
        <p>
          Start: <strong>{state.startWord}</strong> | End:{' '}
          <strong>{state.endWord}</strong>
        </p>
        <p>
          Current: <strong>{state.currentWord}</strong>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`border p-2 text-center ${
                index < state.attempts.length ? 'bg-gray-100' : ''
              }`}
            >
              {state.attempts[index] || ''}
            </div>
          ))}
      </div>

      {!state.gameOver && (
        <div className="mb-4">
          <input
            type="text"
            value={state.inputWord}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter word"
            className="w-full p-2 border rounded"
            maxLength={state.startWord.length}
          />
        </div>
      )}

      {state.message && (
        <p
          className={`mb-4 p-2 rounded ${
            state.message.includes('Congratulations')
              ? 'bg-green-100'
              : state.message.includes('Sorry')
              ? 'bg-red-100'
              : 'bg-blue-100'
          }`}
        >
          {state.message}
        </p>
      )}

      {state.gameOver && (
        <button
          onClick={startNewGame}
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Start New Game
        </button>
      )}

      {renderKeyboard()}
    </div>
  );
};

export default WordChainsGame;
