import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";
import "./TaskList.css";

/**
 * TaskList Component
 * Renders a list of tasks or an empty state message
 */
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
  onDelete,
  onEdit,
  sortBy,
  onSortChange,
}) => {
  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-icon">📋</div>
        <h3>No tasks at the moment</h3>
        <p>Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2 className="task-list-title">
          Your Tasks <span className="task-count">({tasks.length})</span>
        </h2>
        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="sort-select"
          >
            <option value="date">Date (Newest)</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};
