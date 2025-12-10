import { useState } from "react";
import type { Task, FilterOptions, SortOption, TaskStatus } from "../../types";
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  filterTasks,
  sortTasks,
  calculateStats,
} from "../../utils/taskUtils";
import { TaskList } from "../TaskList/TaskList";
import "./Dashboard.css";

/**
 * Dashboard Component
 * Main container that manages all tasks and coordinates child components
 */
export const Dashboard: React.FC = () => {
  // State management - Load tasks from localStorage on initialization
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    priority: "all",
    searchQuery: "",
  });
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Helper function to update tasks and save to localStorage
  const updateTasks = (newTasks: Task[] | ((prev: Task[]) => Task[])) => {
    setTasks((prevTasks) => {
      const updatedTasks =
        typeof newTasks === "function" ? newTasks(prevTasks) : newTasks;
      saveTasksToStorage(updatedTasks);
      return updatedTasks;
    });
  };

  // Toggle task status (pending → in-progress → completed → pending)
  const handleToggleStatus = (taskId: string) => {
    updateTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          // Cycle through statuses
          let newStatus: TaskStatus;
          if (task.status === "pending") {
            newStatus = "in-progress";
          } else if (task.status === "in-progress") {
            newStatus = "completed";
          } else {
            newStatus = "pending";
          }
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  // Delete a task
  const handleDelete = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      updateTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    }
  };

  // Edit a task (placeholder for now)
  const handleEdit = (taskId: string) => {
    console.log("Edit task:", taskId);
    // TODO: Implement edit functionality in next steps
  };

  // Apply filters and sorting
  const filteredTasks = filterTasks(tasks, filters);
  const sortedTasks = sortTasks(filteredTasks, sortBy);

  // Calculate statistics
  const stats = calculateStats(tasks);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">📝 Task Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage your tasks efficiently and stay organized
        </p>
      </header>

      {/* Statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card stat-in-progress">
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card stat-completed">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {/* Task List */}
      <main className="dashboard-main">
        <TaskList
          tasks={sortedTasks}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          onEdit={handleEdit}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </main>
    </div>
  );
};
