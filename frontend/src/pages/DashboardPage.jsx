import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useAuth.js';
import Navbar from '../components/dashboard/Navbar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TaskList from '../components/TaskList.jsx';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { tasks, fetchTasks, loading, error } = useTasks();
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

  // Fetch tasks on component mount and when filters change
  useEffect(() => {
    const loadTasks = async () => {
      const filterParams = {
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        search: filters.search || undefined
      };
      await fetchTasks(filterParams);
    };

    loadTasks();
  }, [filters, fetchTasks]);

  const handleSearch = (searchQuery) => {
    setFilters((prev) => ({
      ...prev,
      search: searchQuery
    }));
  };

  const handleFilterChange = ({ status, priority }) => {
    setFilters((prev) => ({
      ...prev,
      status: status,
      priority: priority
    }));
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your tasks efficiently</p>
          </div>
          <button
            onClick={() => navigate('/tasks/new')}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition duration-200 flex items-center space-x-2"
          >
            <span>+</span>
            <span>New Task</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-danger/10 border border-danger rounded-lg">
            <p className="text-danger font-medium">{error}</p>
          </div>
        )}

        {/* Search and Filters */}
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

        {/* Task List */}
        <TaskList tasks={tasks} loading={loading} />
      </div>
    </div>
  );
};

export default DashboardPage;
