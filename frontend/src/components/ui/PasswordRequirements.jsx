import React from 'react';
import { Check, X } from 'lucide-react';

const PasswordRequirements = ({ password }) => {
  const requirements = [
    {
      id: 'length',
      label: 'At least 8 characters',
      check: (pwd) => pwd.length >= 8
    },
    {
      id: 'uppercase',
      label: 'Contains uppercase letter',
      check: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      id: 'lowercase',
      label: 'Contains lowercase letter',
      check: (pwd) => /[a-z]/.test(pwd)
    },
    {
      id: 'number',
      label: 'Contains a number',
      check: (pwd) => /[0-9]/.test(pwd)
    }
  ];

  if (!password) return null;

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs text-gray-500 font-medium mb-2">Password requirements:</p>
      {requirements.map((req) => {
        const isMet = req.check(password);
        return (
          <div 
            key={req.id} 
            className="flex items-center gap-2 text-xs transition-colors duration-200"
          >
            <div className={`flex-shrink-0 rounded-full p-0.5 ${
              isMet ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {isMet ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <X className="w-3 h-3 text-gray-400" />
              )}
            </div>
            <span className={isMet ? 'text-green-700' : 'text-gray-500'}>
              {req.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordRequirements;
