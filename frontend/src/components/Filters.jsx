import './Filters.css';

export default function Filters({ filters, setFilters, totalCount }) {
  const change = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  const reset = () =>
    setFilters({ status: '', priority: '', sort: 'newest' });

  return (
    <div className="filters-card">
      <div className="filters-top">
        <span className="task-count">{totalCount} task{totalCount !== 1 ? 's' : ''}</span>
        <button className="btn-reset" onClick={reset}>Reset Filters</button>
      </div>
      <div className="filters-row">
        <select value={filters.status} onChange={change('status')}>
          <option value="">All Status</option>
          <option value="pending">⏳ Pending</option>
          <option value="in-progress">🔄 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>

        <select value={filters.priority} onChange={change('priority')}>
          <option value="">All Priority</option>
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        <select value={filters.sort} onChange={change('sort')}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}