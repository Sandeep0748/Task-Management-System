import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useAuth.js';
import Navbar from '../components/Navbar.jsx';
import Loading from '../components/Loading.jsx';

const EditTaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchTaskById, updateTask, loading, error, currentTask } = useTasks();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch task on mount
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

  // Update form when task is fetched
  useEffect(() => {
    if (currentTask) {
      setFormData({
        title: currentTask.title || '',
        description: currentTask.description || '',
        dueDate: currentTask.dueDate?.split('T')[0] || '',
        priority: currentTask.priority || 'medium',
        status: currentTask.status || 'pending'
      });
    }
  }, [currentTask]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must not exceed 100 characters';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must not exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await updateTask(id, formData);
      addToast('Task updated successfully!', 'success');
      navigate('/');
    } catch (err) {
      console.error('Failed to update task:', err);
      addToast('Failed to update task', 'error');
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

  return (
    <div className="min-h-screen bg-light">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark mb-2">Edit Task</h1>
            <p className="text-gray-600">Update your task details</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-danger/10 border border-danger rounded-lg">
              <p className="text-danger font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-dark mb-2">
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title..."
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.title
                    ? 'border-danger focus:ring-danger/50 bg-danger/5'
                    : 'border-gray-300 focus:ring-primary/50'
                }`}
                disabled={loading}
              />
              {errors.title && <p className="text-danger text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-dark mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description (optional)..."
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition resize-none ${
                  errors.description
                    ? 'border-danger focus:ring-danger/50 bg-danger/5'
                    : 'border-gray-300 focus:ring-primary/50'
                }`}
                disabled={loading}
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.description.length}/1000 characters
              </div>
              {errors.description && <p className="text-danger text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-dark mb-2">
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.dueDate
                    ? 'border-danger focus:ring-danger/50 bg-danger/5'
                    : 'border-gray-300 focus:ring-primary/50'
                }`}
                disabled={loading}
              />
              {errors.dueDate && <p className="text-danger text-sm mt-1">{errors.dueDate}</p>}
            </div>

            {/* Priority and Status - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-dark mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700"
                  disabled={loading}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-dark mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700"
                  disabled={loading}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Task'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-dark font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;
