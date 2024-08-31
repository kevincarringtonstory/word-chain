'use client';

import { useEffect } from 'react';
import WordChainsGame from './components/WordChainsGame';

export default function GamePage() {
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
    </div>
  );
}
