import type { TaskItemProps, TaskStatus } from "../../types";
import { formatDate } from "../../utils/taskUtils";
import "./TaskItem.css";

/**
 * TaskItem Component
 * Displays a single task with all its details and action buttons
 */
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onDelete,
  onEdit,
}) => {
  // Get priority badge color
  const getPriorityClass = () => {
    switch (task.priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  // Get status badge color
  const getStatusClass = () => {
    switch (task.status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-in-progress";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  // Format status text for display
  const getStatusText = () => {
    switch (task.status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return task.status;
    }
  };

  // Handle status change from dropdown
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onToggleStatus(task.id, e.target.value as TaskStatus);
  };

  return (
    <div className={`task-item ${getStatusClass()}`}>
      <div className="task-header">
        <div className="task-title-row">
          <h3 className="task-title">{task.title}</h3>
          <span className={`priority-badge ${getPriorityClass()}`}>
            {task.priority}
          </span>
        </div>
        <span className={`status-badge ${getStatusClass()}`}>
          {getStatusText()}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <div className="task-meta">
          <span className="task-date">📅 {formatDate(task.dueDate)}</span>
          <div className="status-selector">
            <select
              value={task.status}
              onChange={handleStatusChange}
              className={`status-dropdown ${getStatusClass()}`}
              title="Change status"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="task-actions">
          <button
            className="btn btn-edit"
            onClick={() => onEdit(task.id)}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            className="btn btn-delete"
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};
