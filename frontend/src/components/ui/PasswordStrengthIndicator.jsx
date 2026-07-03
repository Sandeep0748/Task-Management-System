import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;
    
    if (!password) return { strength: 0, label: '', color: '' };
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    
    // Number check
    if (/[0-9]/.test(password)) strength += 1;
    
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const strength = calculateStrength(password);
  
  const getStrengthInfo = (strength) => {
    if (strength === 0) return { label: '', color: '', percentage: 0 };
    if (strength <= 2) return { label: 'Weak', color: 'bg-red-500', percentage: 33 };
    if (strength <= 3) return { label: 'Medium', color: 'bg-yellow-500', percentage: 66 };
    return { label: 'Strong', color: 'bg-green-500', percentage: 100 };
  };

  const strengthInfo = getStrengthInfo(strength);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">Password strength</span>
        {strengthInfo.label && (
          <span 
            className={`text-xs font-medium ${
              strength <= 2 ? 'text-red-500' : 
              strength <= 3 ? 'text-yellow-600' : 
              'text-green-600'
            }`}
          >
            {strengthInfo.label}
          </span>
        )}
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${strengthInfo.color} transition-all duration-300 ease-out`}
          style={{ width: `${strengthInfo.percentage}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
