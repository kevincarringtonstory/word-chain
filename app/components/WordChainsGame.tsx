'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { dictionary, fourLetterWords } from '@/app/utils/dictionary';
import { findWordChain } from '@/app/utils/wordChainSolver';
import Notification from './Notification';
import Keyboard from './Keyboard';
import Settings from './Settings';
import Statistics from './Statistics';
import GameInstructions from './GameInstructions';

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

  const [showInstructions, setShowInstructions] = useState(true); // Changed to true
  const [wordLength, setWordLength] = useState(3);
  const [showSettings, setShowSettings] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);

  const [gamesPlayed3, setGamesPlayed3] = useState(0);
  const [wins3, setWins3] = useState(0);
  const [losses3, setLosses3] = useState(0);
  const [currentStreak3, setCurrentStreak3] = useState(0);
  const [maxStreak3, setMaxStreak3] = useState(0);

  const [gamesPlayed4, setGamesPlayed4] = useState(0);
  const [wins4, setWins4] = useState(0);
  const [losses4, setLosses4] = useState(0);
  const [currentStreak4, setCurrentStreak4] = useState(0);
  const [maxStreak4, setMaxStreak4] = useState(0);

  // Calculate win percentages
  const winPercentage3 = useMemo(() => {
    if (wins3 + losses3 === 0) return 0;
    return Math.round((wins3 / (wins3 + losses3)) * 100);
  }, [wins3, losses3]);

  const winPercentage4 = useMemo(() => {
    if (wins4 + losses4 === 0) return 0;
    return Math.round((wins4 / (wins4 + losses4)) * 100);
  }, [wins4, losses4]);

  useEffect(() => {
    const initialState = getInitialState();
    setState(initialState);

    // Add event listener for physical keyboard
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [wordLength]);

  useEffect(() => {
    const savedStats = localStorage.getItem('wordChainStats');
    if (savedStats) {
      const {
        gamesPlayed3,
        wins3,
        currentStreak3,
        maxStreak3,
        losses3,
        gamesPlayed4,
        wins4,
        currentStreak4,
        maxStreak4,
        losses4,
      } = JSON.parse(savedStats);
      setGamesPlayed3(gamesPlayed3);
      setWins3(wins3);
      setCurrentStreak3(currentStreak3);
      setMaxStreak3(maxStreak3);
      setLosses3(losses3);
      setGamesPlayed4(gamesPlayed4);
      setWins4(wins4);
      setCurrentStreak4(currentStreak4);
      setMaxStreak4(maxStreak4);
      setLosses4(losses4);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'wordChainStats',
      JSON.stringify({
        gamesPlayed3,
        wins3,
        currentStreak3,
        maxStreak3,
        losses3,
        gamesPlayed4,
        wins4,
        currentStreak4,
        maxStreak4,
        losses4,
      })
    );
  }, [
    gamesPlayed3,
    wins3,
    currentStreak3,
    maxStreak3,
    losses3,
    gamesPlayed4,
    wins4,
    currentStreak4,
    maxStreak4,
    losses4,
  ]);

  const getInitialState = (): GameState => {
    const validWords = wordLength === 3 ? dictionary : fourLetterWords;
    let start, end, solution;

    do {
      start = validWords[Math.floor(Math.random() * validWords.length)];
      end = validWords[Math.floor(Math.random() * validWords.length)];
      solution = findWordChain(start, end, validWords);
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

  const isValidWord = (word: string) =>
    wordLength === 3
      ? dictionary.includes(word)
      : fourLetterWords.includes(word);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, inputWord: e.target.value.toLowerCase() }));
  };

  const handleSubmit = () => {
    const { currentWord, inputWord, endWord, attempts } = state;

    if (inputWord.length !== wordLength) {
      showNotification(`Must be ${wordLength} letters`);
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
      handleGameEnd(inputWord === endWord);
      showNotification(
        inputWord === endWord
          ? `Congratulations! You've reached the target word in ${newAttempts.length} moves!`
          : `Sorry, you've used all 10 attempts. The target word was '${endWord}'.`
      );
    }
  };

  const handleGameEnd = (isWin: boolean) => {
    const statsSetters =
      wordLength === 3
        ? {
            setGamesPlayed: setGamesPlayed3,
            setWins: setWins3,
            setLosses: setLosses3,
            setCurrentStreak: setCurrentStreak3,
            setMaxStreak: setMaxStreak3,
          }
        : {
            setGamesPlayed: setGamesPlayed4,
            setWins: setWins4,
            setLosses: setLosses4,
            setCurrentStreak: setCurrentStreak4,
            setMaxStreak: setMaxStreak4,
          };

    statsSetters.setGamesPlayed((prev) => prev + 1);
    if (isWin) {
      statsSetters.setWins((prev) => prev + 1);
      statsSetters.setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        statsSetters.setMaxStreak((maxStreak) =>
          Math.max(maxStreak, newStreak)
        );
        return newStreak;
      });
    } else {
      statsSetters.setLosses((prev) => prev + 1);
      statsSetters.setCurrentStreak(0);
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
        prev.inputWord.length < wordLength
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (state.gameOver) return;

    const key = event.key.toUpperCase();
    if (key === 'ENTER') {
      handleSubmit();
    } else if (key === 'BACKSPACE') {
      handleBackspace();
    } else if (/^[A-Z]$/.test(key)) {
      handleKeyPress(key);
    }
  };

  const handleWordLengthChange = (length: number) => {
    setWordLength(length);
    setState(getInitialState());
    setShowSettings(false);
  };

  const statistics = {
    gamesPlayed3,
    winPercentage3,
    currentStreak3,
    maxStreak3,
    losses3,
    gamesPlayed4,
    winPercentage4,
    currentStreak4,
    maxStreak4,
    losses4,
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 py-3 sticky top-0 z-10">
        <button
          className="text-gray-600 font-bold text-lg sm:text-xl p-2"
          onClick={() => setShowInstructions(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="var(--color-tone-3)"
              d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
            ></path>
          </svg>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
          WORD CHAIN
        </h1>
        <div className="flex">
          <button className="mr-2 p-2" onClick={() => setShowStatistics(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                fill="var(--color-tone-3)"
                d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
              ></path>
            </svg>
          </button>
          <button className="p-2" onClick={() => setShowSettings(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                fill="var(--color-tone-3)"
                d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
              ></path>
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto flex flex-col justify-between">
        <div className="font-sans w-full max-w-md mx-auto p-2 sm:p-5 flex flex-col">
          {showInstructions && (
            <GameInstructions
              isVisible={showInstructions}
              onClose={() => setShowInstructions(false)}
            />
          )}

          <div className="mb-6 text-center">
            <div className="flex justify-center items-center space-x-6 mb-4">
              <div
                key={
                  state.attempts.length > 0
                    ? state.attempts[state.attempts.length - 1]
                    : state.startWord
                }
                className="text-4xl font-bold p-4 bg-blue-100 rounded-lg shadow-md spin-animation"
              >
                {state.attempts.length > 0
                  ? state.attempts[state.attempts.length - 1]
                  : state.startWord}
              </div>
              <div className="text-3xl font-bold">➔</div>
              <div className="text-4xl font-bold p-4 bg-green-100 rounded-lg shadow-md">
                {state.endWord}
              </div>
            </div>
            <p className="mt-4 text-xl">
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
            <div className="mb-2">
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
                maxLength={wordLength}
                readOnly
              />
            </div>
          )}

          {state.gameOver && (
            <button
              onClick={startNewGame}
              className="w-full p-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          )}
        </div>

        {!state.gameOver && (
          <div className="w-full mt-auto">
            <Keyboard
              onKeyPress={handleKeyPress}
              onEnter={handleEnter}
              onBackspace={handleBackspace}
              disabledKeys={new Set()} // Implement logic for disabled keys if needed
            />
          </div>
        )}
      </main>

      <Notification
        message={state.notificationMessage}
        isVisible={state.showNotification}
        onHide={() =>
          setState((prev) => ({ ...prev, showNotification: false }))
        }
      />

      {showSettings && (
        <Settings
          isVisible={showSettings}
          onClose={() => setShowSettings(false)}
          wordLength={wordLength}
          onWordLengthChange={handleWordLengthChange}
        />
      )}

      {showStatistics && (
        <Statistics
          isVisible={showStatistics}
          onClose={() => setShowStatistics(false)}
          {...statistics}
        />
      )}
    </div>
  );
};

export default WordChainsGame;
