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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <WordChainsGame />
      {showInstructions && (
        <GameInstructions onClose={() => setShowInstructions(false)} />
      )}
    </main>
  );
}
