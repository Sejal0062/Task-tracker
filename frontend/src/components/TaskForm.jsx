import { useState, useEffect } from 'react';
import './TaskForm.css';

const emptyForm = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
};

export default function TaskForm({ onSubmit, editTask, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || '',
        description: editTask.description || '',
        status: editTask.status || 'pending',
        priority: editTask.priority || 'medium',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editTask]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) {
      e.title = 'Title is required';
    } else if (form.title.trim().length < 2) {
      e.title = 'Title must be at least 2 characters';
    } else if (form.title.trim().length > 100) {
      e.title = 'Title cannot exceed 100 characters';
    }
    if (form.description.length > 500) {
      e.description = 'Description cannot exceed 500 characters';
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
    if (!editTask) setForm(emptyForm);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="form-card">
      <h2>{editTask ? '✏️ Edit Task' : '➕ Add New Task'}</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <div className={`field ${errors.title ? 'field-error' : ''}`}>
          <label>Task Title *</label>
          <input
            type="text"
            placeholder="e.g. Complete assignment"
            value={form.title}
            onChange={handleChange('title')}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        {/* Description */}
        <div className={`field ${errors.description ? 'field-error' : ''}`}>
          <label>Description</label>
          <textarea
            placeholder="Optional details about the task..."
            value={form.description}
            onChange={handleChange('description')}
            rows={3}
          />
          <div className="char-count">{form.description.length}/500</div>
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>

        {/* Status & Priority */}
        <div className="row">
          <div className="field">
            <label>Status</label>
            <select value={form.status} onChange={handleChange('status')}>
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>
          <div className="field">
            <label>Priority</label>
            <select value={form.priority} onChange={handleChange('priority')}>
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
          {editTask && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}