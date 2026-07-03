import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  type = 'button',
  children,
  disabled = false,
  loading = false,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'w-full py-3.5 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 transform hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
