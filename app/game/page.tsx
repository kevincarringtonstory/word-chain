'use client';

import { useState, useEffect } from 'react';
import WordChainsGame from '../components/WordChainsGame';
import GameInstructions from '../components/GameInstructions';

export default function GamePage() {
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Show instructions when the component mounts
    setShowInstructions(true);
  }, []);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);

    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <WordChainsGame />
      {showInstructions && (
        <GameInstructions onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}
