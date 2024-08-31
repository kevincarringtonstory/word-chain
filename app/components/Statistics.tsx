import React, { useState, useEffect } from 'react';

interface StatisticsProps {
  gamesPlayed3: number;
  winPercentage3: number;
  currentStreak3: number;
  maxStreak3: number;
  losses3: number;
  gamesPlayed4: number;
  winPercentage4: number;
  currentStreak4: number;
  maxStreak4: number;
  losses4: number;
  onClose: () => void;
  isVisible: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({
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
  onClose,
  isVisible,
}) => {
  const [animate, setAnimate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setAnimate(false);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (isVisible && !isClosing) {
      setTimeout(() => setAnimate(true), 50);
    } else {
      setAnimate(false);
    }
  }, [isVisible, isClosing]);

  if (!isVisible && !isClosing) return null;

  const formatValue = (value: number): string => {
    return isNaN(value) || value === Infinity ? '0' : value.toString();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ease-out ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg max-w-sm w-full transition-all duration-300 ease-out ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">STATISTICS</h2>
          <button onClick={handleClose} className="text-2xl">
            &times;
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">3-Letter Words</h3>
          <div className="grid grid-cols-5 gap-4">
            <StatItem label="Played" value={formatValue(gamesPlayed3)} />
            <StatItem label="Win %" value={formatValue(winPercentage3)} />
            <StatItem
              label="Current Streak"
              value={formatValue(currentStreak3)}
            />
            <StatItem label="Max Streak" value={formatValue(maxStreak3)} />
            <StatItem label="Losses" value={formatValue(losses3)} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">4-Letter Words</h3>
          <div className="grid grid-cols-5 gap-4">
            <StatItem label="Played" value={formatValue(gamesPlayed4)} />
            <StatItem label="Win %" value={formatValue(winPercentage4)} />
            <StatItem
              label="Current Streak"
              value={formatValue(currentStreak4)}
            />
            <StatItem label="Max Streak" value={formatValue(maxStreak4)} />
            <StatItem label="Losses" value={formatValue(losses4)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="text-center">
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-xs">{label}</div>
  </div>
);

export default Statistics;
