import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api.js';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (filters = {}) => {
    try {
      setError(null);
      setLoading(true);

      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/tasks?${params.toString()}`);
      setTasks(response.data.tasks);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch tasks';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTaskById = useCallback(async (taskId) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.get(`/tasks/${taskId}`);
      setCurrentTask(response.data.task);
      return response.data.task;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch task';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.post('/tasks', taskData);
      setTasks([response.data.task, ...tasks]);
      return response.data.task;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create task';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [tasks]);

  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.put(`/tasks/${taskId}`, taskData);
      const updatedTask = response.data.task;

      setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
      if (currentTask?._id === taskId) {
        setCurrentTask(updatedTask);
      }

      return updatedTask;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update task';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [tasks, currentTask]);

  const deleteTask = useCallback(async (taskId) => {
    try {
      setError(null);
      setLoading(true);

      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));

      if (currentTask?._id === taskId) {
        setCurrentTask(null);
      }

      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete task';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [tasks, currentTask]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    tasks,
    currentTask,
    loading,
    error,
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
    setCurrentTask,
    clearError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
