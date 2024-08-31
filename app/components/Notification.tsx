import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  isGameWon: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  isVisible,
  isGameWon,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible || isGameWon) {
      setIsShowing(true);
      const timer = setTimeout(() => setIsShowing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isGameWon]);

  const displayMessage = isGameWon ? 'Great job!' : message;

  if (!isShowing && !displayMessage) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
        isShowing ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg">
        {displayMessage}
      </div>
    </div>
  );
};

export default Notification;
