import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 4000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-secondary text-white';
      case 'error':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'info':
        return 'bg-primary text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  };

  return (
    <div className={`${getStyles()} px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in`}>
      <span className="text-xl font-bold">{getIcon()}</span>
      <p className="font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-75 transition"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
