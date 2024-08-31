import React, { useState, useEffect } from 'react';

interface StatisticsProps {
  onClose: () => void;
  isVisible: boolean;
}

export class Stats {
  gamesPlayed: number = 0;
  wins: number = 0;
  losses: number = 0;
  currentStreak: number = 0;
  maxStreak: number = 0;

  constructor(data?: string) {
    if (data && data !== 'default') {
      const parsedData = JSON.parse(data) as Partial<Stats>;
      Object.assign(this, parsedData);
    }
  }

  addWin() {
    this.gamesPlayed++;
    this.wins++;
    this.currentStreak++;
    this.maxStreak = Math.max(this.currentStreak, this.maxStreak);
  }

  addLoss() {
    this.gamesPlayed++;
    this.losses++;
    this.currentStreak = 0;
  }

  toString() {
    return JSON.stringify(this);
  }

  getWinPercentage() {
    return this.gamesPlayed > 0 ? (this.wins / this.gamesPlayed) * 100 : 0;
  }
}

const Statistics: React.FC<StatisticsProps> = ({ onClose, isVisible }) => {
  const [animate, setAnimate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [stats3, setStats3] = useState(new Stats());
  const [stats4, setStats4] = useState(new Stats());

  useEffect(() => {
    const loadStats = () => {
      const stats3Data = localStorage.getItem('game-stats-3') || 'default';
      const stats4Data = localStorage.getItem('game-stats-4') || 'default';
      setStats3(new Stats(stats3Data));
      setStats4(new Stats(stats4Data));
    };

    loadStats();
  }, []);

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
    return isNaN(value) || value === Infinity ? '0' : value.toFixed(0);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ease-out ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto
          transition-all duration-300 ease-out ${
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
            <StatItem label="Played" value={formatValue(stats3.gamesPlayed)} />
            <StatItem
              label="Win %"
              value={formatValue(stats3.getWinPercentage())}
            />
            <StatItem
              label="Current Streak"
              value={formatValue(stats3.currentStreak)}
            />
            <StatItem
              label="Max Streak"
              value={formatValue(stats3.maxStreak)}
            />
            <StatItem label="Losses" value={formatValue(stats3.losses)} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">4-Letter Words</h3>
          <div className="grid grid-cols-5 gap-4">
            <StatItem label="Played" value={formatValue(stats4.gamesPlayed)} />
            <StatItem
              label="Win %"
              value={formatValue(stats4.getWinPercentage())}
            />
            <StatItem
              label="Current Streak"
              value={formatValue(stats4.currentStreak)}
            />
            <StatItem
              label="Max Streak"
              value={formatValue(stats4.maxStreak)}
            />
            <StatItem label="Losses" value={formatValue(stats4.losses)} />
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
