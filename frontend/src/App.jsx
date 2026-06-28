import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filters from './components/Filters';
import Notification from './components/Notification';
import './App.css';
const API_BASE = 'https://task-tracker-vfj9.onrender.com/api/tasks';
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sort: 'newest',
  });

  // ── Show notification ──
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  // ── Fetch tasks ──
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = { sort: filters.sort };
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const { data } = await axios.get(API_BASE, { params });
      setTasks(data);
    } catch (err) {
      showNotification('Failed to fetch tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  // ── Create task ──
  const handleCreate = async (taskData) => {
    try {
      await axios.post(API_BASE, taskData);
      showNotification('✅ Task created successfully!');
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create task';
      showNotification(msg, 'error');
    }
  };

  // ── Update task ──
  const handleUpdate = async (id, taskData) => {
    try {
      await axios.put(`${API_BASE}/${id}`, taskData);
      setEditTask(null);
      showNotification('✅ Task updated successfully!');
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update task';
      showNotification(msg, 'error');
    }
  };

  // ── Delete task ──
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      showNotification('🗑️ Task deleted successfully!');
      fetchTasks();
    } catch (err) {
      showNotification('Failed to delete task', 'error');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Tracker</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        {notification.message && (
          <Notification message={notification.message} type={notification.type} />
        )}

        <TaskForm
          onSubmit={editTask ? (d) => handleUpdate(editTask._id, d) : handleCreate}
          editTask={editTask}
          onCancel={() => setEditTask(null)}
        />

        <Filters filters={filters} setFilters={setFilters} totalCount={tasks.length} />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList tasks={tasks} onEdit={setEditTask} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}