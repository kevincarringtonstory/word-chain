import React, { JSX, useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  isVisible,
  onHide,
}) => {
  const [isShowing, setIsShowing] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onHide, 300); // Call onHide after fade-out animation
      }, 1500); // Changed from 1000 to 1500 milliseconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
        isShowing ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Notification;
