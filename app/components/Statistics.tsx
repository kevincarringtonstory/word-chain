import React from 'react';

interface StatisticsProps {
  gamesPlayed: number;
  winPercentage: number;
  currentStreak: number;
  maxStreak: number;
  onClose: () => void;
}

const Statistics: React.FC<StatisticsProps> = ({
  gamesPlayed,
  winPercentage,
  currentStreak,
  maxStreak,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">STATISTICS</h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatItem label="Played" value={gamesPlayed} />
          <StatItem label="Win %" value={winPercentage} />
          <StatItem label="Current Streak" value={currentStreak} />
          <StatItem label="Max Streak" value={maxStreak} />
        </div>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="text-center">
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-xs">{label}</div>
  </div>
);

export default Statistics;
