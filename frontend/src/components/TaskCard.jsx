import './TaskCard.css';

const STATUS_STYLES = {
  pending:     { bg: '#fef3c7', color: '#92400e', label: '⏳ Pending' },
  'in-progress': { bg: '#dbeafe', color: '#1e40af', label: '🔄 In Progress' },
  completed:   { bg: '#d1fae5', color: '#065f46', label: '✅ Completed' },
};

const PRIORITY_STYLES = {
  low:    { bg: '#f1f5f9', color: '#475569', label: '🟢 Low' },
  medium: { bg: '#fff7ed', color: '#9a3412', label: '🟡 Medium' },
  high:   { bg: '#fee2e2', color: '#991b1b', label: '🔴 High' },
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const status = STATUS_STYLES[task.status] || STATUS_STYLES.pending;
  const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });

  return (
    <div className={`task-card priority-border-${task.priority}`}>
      <div className="task-top">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span className="badge" style={{ background: status.bg, color: status.color }}>
            {status.label}
          </span>
          <span className="badge" style={{ background: priority.bg, color: priority.color }}>
            {priority.label}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      <div className="task-bottom">
        <span className="task-date">Created: {formatDate(task.createdAt)}</span>
        <div className="task-actions">
          <button className="btn-edit" onClick={() => onEdit(task)}>
            ✏️ Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(task._id)}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}