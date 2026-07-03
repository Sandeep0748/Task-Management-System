import React from 'react';
import { XCircle } from 'lucide-react';

const InputField = ({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = '',
  icon: Icon,
  rightElement,
  autoComplete,
  required = false
}) => {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200">
            <Icon className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${rightElement ? 'pr-12' : 'pr-4'} py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 animate-focus-ring ${
            error
              ? 'border-red-300 focus:ring-red-200 bg-red-50/50'
              : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400 bg-white hover:border-gray-400'
          }`}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={autoComplete}
          required={required}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-fade-in">
          <XCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
