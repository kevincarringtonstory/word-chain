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
  console.log('Notification props:', { message, isVisible, isGameWon });
  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Notification;
