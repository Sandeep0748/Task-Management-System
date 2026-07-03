import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useAuth.js';
import Navbar from '../components/dashboard/Navbar.jsx';
import Loading from '../components/Loading.jsx';

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchTaskById, deleteTask, currentTask, loading, error } = useTasks();
  const { addToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        await fetchTaskById(id);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch task:', err);
        setIsLoading(false);
      }
    };

    loadTask();
  }, [id, fetchTaskById]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = currentTask && new Date(currentTask.dueDate) < new Date() && currentTask.status !== 'completed';

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-danger/10 text-danger border-danger/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'in-progress':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await deleteTask(id);
        addToast('Task deleted successfully', 'success');
        navigate('/');
      } catch (error) {
        console.error('Failed to delete task:', error);
        addToast('Failed to delete task', 'error');
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Loading message="Loading task..." />
        </div>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-dark mb-4">Task Not Found</h2>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-danger/10 border border-danger rounded-lg">
            <p className="text-danger font-medium">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className={`text-3xl font-bold ${currentTask.status === 'completed' ? 'line-through text-gray-400' : 'text-dark'}`}>
              {currentTask.title}
            </h1>
          </div>

          {/* Status and Priority Badges */}
          <div className="flex items-center space-x-3 mb-6">
            <span className={`px-4 py-2 rounded-lg border font-semibold ${getPriorityColor(currentTask.priority)}`}>
              {currentTask.priority.charAt(0).toUpperCase() + currentTask.priority.slice(1)} Priority
            </span>
            <span className={`px-4 py-2 rounded-lg border font-semibold ${getStatusColor(currentTask.status)}`}>
              {getStatusLabel(currentTask.status)}
            </span>
            {isOverdue && (
              <span className="px-4 py-2 rounded-lg border border-danger/20 bg-danger/10 text-danger font-semibold">
                Overdue
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Content */}
          <div className="space-y-8">
            {/* Description */}
            {currentTask.description && (
              <div>
                <h2 className="text-lg font-semibold text-dark mb-3">Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{currentTask.description}</p>
              </div>
            )}

            {/* Due Date */}
            <div>
              <h2 className="text-lg font-semibold text-dark mb-3">Due Date</h2>
              <p className="text-gray-700 text-lg">
                📅 {formatDate(currentTask.dueDate)}
              </p>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Created</h3>
                <p className="text-gray-700">
                  {new Date(currentTask.createdAt).toLocaleDateString('en-US')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Last Updated</h3>
                <p className="text-gray-700">
                  {new Date(currentTask.updatedAt).toLocaleDateString('en-US')}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/tasks/${id}/edit`)}
              className="flex-1 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition"
            >
              Edit Task
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-dark font-semibold rounded-lg transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 px-6 py-3 bg-danger/20 hover:bg-danger/30 text-danger font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
