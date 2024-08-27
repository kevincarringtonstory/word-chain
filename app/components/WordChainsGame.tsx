'use client';

import React, { useState, useEffect } from 'react';

// Import a dictionary of words (you'll need to create this file)
import dictionary from '@/app/utils/dictionary';

import { findWordChain } from '@/app/utils/wordChainSolver';

const WordChainsGame: React.FC = () => {
  const [state, setState] = useState({
    startWord: '',
    endWord: '',
    currentWord: '',
    inputWord: '',
    attempts: [] as string[],
    message: '',
    gameOver: false,
    solution: '',
  });

  useEffect(() => {
    setState(getInitialState());
  }, []);

  const getInitialState = () => {
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
      solution: solution,
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
      [...inputWord].filter((char, i) => char !== currentWord[i]).length !== 1
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

  const startNewGame = () => {
    setState(getInitialState());
  };

  return (
    <div className="font-sans max-w-md mx-auto p-5">
      <h1 className="text-2xl mb-5">Word Chains Game</h1>
      <p>
        Start word: <strong>{state.startWord}</strong>
      </p>
      <p>
        End word: <strong>{state.endWord}</strong>
      </p>
      <p>
        Current word: <strong>{state.currentWord}</strong>
      </p>
      <p>Attempts: {state.attempts.length}/10</p>

      {!state.gameOver && (
        <div className="my-4">
          <input
            type="text"
            value={state.inputWord}
            onChange={handleInputChange}
            placeholder="Enter your next word"
            className="mr-2 p-2 border rounded"
          />
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      )}

      {state.message && (
        <p
          className={`mt-4 p-2 rounded ${
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

      {state.attempts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl">Your attempts:</h2>
          <ol className="list-decimal list-inside">
            {state.attempts.map((attempt, index) => (
              <li key={index}>{attempt}</li>
            ))}
          </ol>
        </div>
      )}

      {state.gameOver && (
        <button
          onClick={startNewGame}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          Start New Game
        </button>
      )}
    </div>
  );
};

export default WordChainsGame;
