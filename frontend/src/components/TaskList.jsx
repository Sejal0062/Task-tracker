import TaskCard from './TaskCard';
import './TaskList.css';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>No tasks found</p>
        <span>Add a new task or adjust your filters</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}