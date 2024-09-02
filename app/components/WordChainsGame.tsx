'use client';

import React, { useState, useEffect, useRef } from 'react';
import { dictionary, fourLetterWords } from '@/app/utils/dictionary';
import { findWordChain } from '@/app/utils/wordChainSolver';
import { validateWordChange } from '@/app/utils/wordChainValidation';
import { Stats } from '@/app/components/Statistics';
import Notification from './Notification';
import Keyboard from './Keyboard';
import Settings from './Settings';
import Statistics from './Statistics';
import GameInstructions from './GameInstructions';
import GameOver from './GameOver';

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

  const [showInstructions, setShowInstructions] = useState(true);
  const [wordLength, setWordLength] = useState(3);
  const [showSettings, setShowSettings] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);

  const [stats3, setStats3] = useState(new Stats());
  const [stats4, setStats4] = useState(new Stats());

  const [isExpanding, setIsExpanding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [gameCompletionMessage, setGameCompletionMessage] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);

  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialState = getInitialState();
    setState(initialState);

    // Load stats from local storage
    const stats3Data = localStorage.getItem('game-stats-3') || 'default';
    const stats4Data = localStorage.getItem('game-stats-4') || 'default';
    setStats3(new Stats(stats3Data));
    setStats4(new Stats(stats4Data));
  }, [wordLength]);

  useEffect(() => {
    // Save stats to local storage whenever they change
    localStorage.setItem('game-stats-3', stats3.toString());
    localStorage.setItem('game-stats-4', stats4.toString());
  }, [stats3, stats4]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, inputWord: e.target.value.toLowerCase() }));
  };

  const handleSubmit = () => {
    console.log('handleSubmit called');
    const { currentWord, inputWord, endWord, attempts } = state;

    const validation = validateWordChange(currentWord, inputWord, wordLength);
    console.log('Validation result:', validation);
    if (!validation.isValid) {
      // Clear any existing timeout
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }

      setState((prev) => ({
        ...prev,
        notificationMessage: validation.message,
        showNotification: true,
      }));

      // Set a new timeout and store the reference
      notificationTimeoutRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, showNotification: false }));
      }, 1500);

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
      showNotification: false,
    }));

    if (gameOver) {
      handleGameEnd(inputWord === endWord);
    }
  };

  const handleGameEnd = (isWin: boolean) => {
    const currentStats = wordLength === 3 ? stats3 : stats4;
    const setStats = wordLength === 3 ? setStats3 : setStats4;

    if (isWin) {
      currentStats.addWin();
      setGameCompletionMessage(
        `Congratulations! You've reached the target word in ${state.attempts.length} moves!`
      );
      setIsGameWon(true);
    } else {
      currentStats.addLoss();
      setGameCompletionMessage(
        `Sorry, you've used all 10 attempts. The target word was '${state.endWord}'.`
      );
    }

    setStats(new Stats(currentStats.toString()));

    // Show game completion notification
    showNotification(gameCompletionMessage);

    // Show statistics after a short delay
    setTimeout(() => {
      setShowStatistics(true);
    }, 2000);
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

    // Trigger expansion effect
    setIsExpanding(true);
    setTimeout(() => setIsExpanding(false), 50);
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

  const handleWordLengthChange = (length: number) => {
    setWordLength(length);
    setState(getInitialState());
    setShowSettings(false);
  };

  const statistics = {
    stats3,
    stats4,
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 flex flex-col w-full max-w-lg mx-auto p-2 sm:p-4">
        <header className="w-full max-w-[500px] mx-auto bg-white shadow-sm flex items-center justify-between mb-2 sm:mb-4 relative">
          <button
            className="text-gray-600 font-bold text-lg sm:text-xl p-2 absolute left-0"
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold flex-grow text-center py-2">
            WORD CHAIN
          </h1>
          <div className="flex absolute right-0">
            <button
              className="mr-2 p-2"
              onClick={() => setShowStatistics(true)}
            >
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

        <main className="flex-1 flex flex-col justify-between mt-2 sm:mt-4">
          {showInstructions && (
            <GameInstructions
              isVisible={showInstructions}
              onClose={() => setShowInstructions(false)}
            />
          )}

          {/* New div for the main play area with increased top padding */}
          <div className="flex-1 flex flex-col justify-center pt-8 sm:pt-12 md:pt-16">
            <div className="mb-2 sm:mb-4 text-center">
              <div className="flex justify-center items-center space-x-4 mb-2">
                <div
                  key={
                    state.attempts.length > 0
                      ? state.attempts[state.attempts.length - 1]
                      : state.startWord
                  }
                  className="text-4xl font-bold p-4 bg-blue-100 rounded-lg shadow-md spin-animation max-[350px]:text-3xl max-[350px]:p-2"
                >
                  {state.attempts.length > 0
                    ? state.attempts[state.attempts.length - 1]
                    : state.startWord}
                </div>
                <div className="text-3xl font-bold max-[350px]:text-2xl">➔</div>
                <div className="text-4xl font-bold p-4 bg-green-100 rounded-lg shadow-md max-[350px]:text-3xl max-[350px]:p-2">
                  {state.endWord}
                </div>
              </div>
              <p className="mt-2 text-lg sm:text-xl">
                Starting Word: <strong>{state.startWord}</strong>
              </p>
            </div>

            <div className="flex-grow flex flex-col justify-center">
              <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-2 sm:mb-4">
                {Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`border p-1 sm:p-2 text-center h-8 sm:h-10 flex items-center justify-center text-sm sm:text-base ${
                        index < state.attempts.length ? 'bg-gray-100' : ''
                      }`}
                    >
                      {state.attempts[index] || ''}
                    </div>
                  ))}
              </div>

              {!state.gameOver && (
                <div className="mb-2 sm:mb-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={state.inputWord}
                    onChange={handleInputChange}
                    className={`w-full py-3 sm:py-4 px-2 sm:px-4 border-2 border-blue-300 rounded-lg text-xl sm:text-2xl text-center font-bold tracking-wider focus:outline-none focus:border-blue-500 transition-all duration-100 ${
                      isExpanding ? 'scale-105' : 'scale-100'
                    }`}
                    maxLength={wordLength}
                    readOnly
                  />
                </div>
              )}

              {state.gameOver && (
                <GameOver
                  onPlayAgain={startNewGame}
                  isWin={state.currentWord === state.endWord}
                  attempts={state.attempts.length}
                  endWord={state.endWord}
                />
              )}
            </div>
          </div>
        </main>

        {!state.gameOver && (
          <div className="mt-auto">
            <Keyboard
              onKeyPress={handleKeyPress}
              onEnter={handleEnter}
              onBackspace={handleBackspace}
              disabledKeys={new Set()}
            />
          </div>
        )}
      </div>

      <Notification
        message={state.notificationMessage}
        isVisible={state.showNotification}
        isGameWon={isGameWon}
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
