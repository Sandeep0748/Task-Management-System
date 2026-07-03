import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ClipboardList } from 'lucide-react';

const EmptyState = ({ 
  message = "No tasks found", 
  subMessage = "Start by creating your first task"
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
          <ClipboardList className="w-16 h-16 text-blue-500" />
        </div>
      </div>

      {/* Message */}
      <h3 className="text-3xl font-bold mb-3 text-gray-900">
        {message}
      </h3>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        {subMessage}
      </p>

      {/* Action Button */}
      <button
        onClick={() => navigate('/tasks/new')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Create First Task</span>
      </button>
    </div>
  );
};

export default EmptyState;
