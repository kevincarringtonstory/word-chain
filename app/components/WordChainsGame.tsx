'use client';

import React, { useState, useEffect } from 'react';
import dictionary from '@/app/utils/dictionary';
import { findWordChain } from '@/app/utils/wordChainSolver';
import Notification from './Notification';
import Keyboard from './Keyboard';

interface GameState {
  startWord: string;
  endWord: string;
  currentWord: string;
  inputWord: string;
  attempts: string[];
  message: string;
  gameOver: boolean;
  solution: string[];
  notificationMessage: string;
  showNotification: boolean;
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
    solution: [],
    notificationMessage: '',
    showNotification: false,
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
      solution: solution || [],
      notificationMessage: '',
      showNotification: false,
    };
  };

  const isValidWord = (word: string) => dictionary.includes(word);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, inputWord: e.target.value.toLowerCase() }));
  };

  const handleSubmit = () => {
    const { currentWord, inputWord, endWord, attempts } = state;

    if (inputWord.length !== currentWord.length) {
      showNotification('Must be 3 letters');
      return;
    }
    if (
      inputWord.split('').filter((char, i) => char !== currentWord[i])
        .length !== 1
    ) {
      showNotification('Only one letter change.');
      return;
    }
    if (!isValidWord(inputWord)) {
      showNotification('Not in word list');
      return;
    }

    const newAttempts = [...attempts, inputWord];
    const gameOver = inputWord === endWord || newAttempts.length >= 10;

    setState((prev) => ({
      ...prev,
      currentWord: inputWord,
      inputWord: '',
      attempts: newAttempts,
      gameOver: gameOver,
    }));

    if (gameOver) {
      if (inputWord === endWord) {
        showNotification(
          `Congratulations! You've reached the target word in ${newAttempts.length} moves!`
        );
      } else {
        showNotification(
          `Sorry, you've used all 10 attempts. The target word was '${endWord}'.`
        );
      }
    }
  };

  const showNotification = (message: string) => {
    setState((prev) => ({
      ...prev,
      notificationMessage: message,
      showNotification: true,
    }));

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        showNotification: false,
      }));
    }, 2000);
  };

  const startNewGame = () => {
    setState(getInitialState());
  };

  const handleKeyPress = (key: string) => {
    if (state.gameOver) return;

    setState((prev) => ({
      ...prev,
      inputWord:
        prev.inputWord.length < 3
          ? prev.inputWord + key.toLowerCase()
          : prev.inputWord,
    }));
  };

  const handleBackspace = () => {
    if (state.gameOver) return;

    setState((prev) => ({
      ...prev,
      inputWord: prev.inputWord.slice(0, -1),
    }));
  };

  const handleEnter = () => {
    if (state.gameOver) return;
    handleSubmit();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="w-full bg-white shadow-sm flex items-center px-2 sm:px-4 py-2 sm:py-3 sticky top-0 z-10">
        <button
          className="text-gray-600 font-bold text-lg sm:text-xl p-2"
          onClick={() => setShowInstructions(true)}
        >
          ?
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold flex-grow text-center">
          WORD CHAIN
        </h1>
        <div className="flex">
          <button className="mr-2 p-2">📊</button>
          <button className="p-2">⚙️</button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto">
        <div className="font-sans w-full max-w-md mx-auto p-2 sm:p-5 flex flex-col justify-start">
          {showInstructions && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg max-w-sm">
                <h2 className="text-xl font-bold mb-2">How to Play</h2>
                <p>
                  Change one letter at a time to transform the start word into
                  the end word.
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

          <div className="mb-6 text-center">
            <div className="flex justify-center items-center space-x-4">
              <div
                key={
                  state.attempts.length > 0
                    ? state.attempts[state.attempts.length - 1]
                    : state.startWord
                }
                className="text-2xl font-bold p-3 bg-blue-100 rounded-lg spin-animation"
              >
                {state.attempts.length > 0
                  ? state.attempts[state.attempts.length - 1]
                  : state.startWord}
              </div>
              <div className="text-xl">➔</div>
              <div className="text-2xl font-bold p-3 bg-green-100 rounded-lg">
                {state.endWord}
              </div>
            </div>
            <p className="mt-4 text-lg">
              Starting Word: <strong>{state.startWord}</strong>
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className={`border p-2 text-center h-10 flex items-center justify-center ${
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
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    inputWord: e.target.value.toLowerCase(),
                  }))
                }
                placeholder="Enter word"
                className="w-full p-2 border rounded"
                maxLength={state.startWord.length}
                readOnly
              />
            </div>
          )}
        </div>
      </main>

      {!state.gameOver && (
        <div className="w-full">
          <Keyboard
            onKeyPress={handleKeyPress}
            onEnter={handleEnter}
            onBackspace={handleBackspace}
            disabledKeys={new Set()} // Implement logic for disabled keys if needed
          />
        </div>
      )}

      <Notification
        message={state.notificationMessage}
        isVisible={state.showNotification}
        onHide={() =>
          setState((prev) => ({ ...prev, showNotification: false }))
        }
      />
    </div>
  );
};

export default WordChainsGame;
