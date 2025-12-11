import { useState } from "react";
import type {
  Task,
  FilterOptions,
  SortOption,
  TaskStatus,
  TaskFormData,
} from "../../types";
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  filterTasks,
  sortTasks,
  calculateStats,
  createTask,
  exportTasksToJSON,
  importTasksFromJSON,
} from "../../utils/taskUtils";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import type { Theme } from "../../types";
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as Theme) || "light";
  });

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

  // Add a new task
  const handleAddTask = (formData: TaskFormData) => {
    const newTask = createTask(formData);
    updateTasks((prevTasks) => [newTask, ...prevTasks]);
    setIsFormOpen(false);
  };

  // Edit a task - update existing task
  const handleEditTask = (formData: TaskFormData) => {
    if (!editingTaskId) return;

    updateTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === editingTaskId) {
          // Keep id, status, and createdAt - update everything else
          return {
            ...task,
            title: formData.title.trim(),
            description: formData.description.trim(),
            priority: formData.priority,
            dueDate: formData.dueDate,
          };
        }
        return task;
      })
    );

    setIsFormOpen(false);
    setEditingTaskId(null);
  };

  // Open edit form with task data
  const handleEdit = (taskId: string) => {
    setEditingTaskId(taskId);
    setIsFormOpen(true);
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Export tasks to JSON file
  const handleExport = () => {
    exportTasksToJSON(tasks);
  };

  // Import tasks from JSON file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const importedTasks = importTasksFromJSON(content);

      if (importedTasks) {
        if (
          confirm(
            `Import ${importedTasks.length} tasks? They will be added to your existing tasks.`
          )
        ) {
          // Add imported tasks to existing ones (avoid duplicates by ID)
          updateTasks((prevTasks) => {
            const existingIds = new Set(prevTasks.map((t) => t.id));
            const newTasks = importedTasks.filter(
              (t) => !existingIds.has(t.id)
            );
            return [...newTasks, ...prevTasks];
          });
        }
      } else {
        alert("Invalid file format. Please select a valid tasks JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = "";
  };

  // Apply filters and sorting
  const filteredTasks = filterTasks(tasks, filters);
  const sortedTasks = sortTasks(filteredTasks, sortBy);

  // Calculate statistics
  const stats = calculateStats(tasks);

  return (
    <div className={`dashboard ${theme}`}>
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">📝 Task Dashboard</h1>
            <p className="dashboard-subtitle">
              Manage your tasks efficiently and stay organized
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
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
        <div className="dashboard-actions">
          <div className="actions-left">
            <button className="btn-export" onClick={handleExport}>
              <span className="btn-icon">📥</span>
              Export
            </button>
            <label className="btn-import">
              <span className="btn-icon">📤</span>
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <button className="btn-new-task" onClick={() => setIsFormOpen(true)}>
            <span className="btn-icon">➕</span>
            New Task
          </button>
        </div>

        {/* Filters */}
        <TaskFilter filters={filters} onFilterChange={setFilters} />

        <TaskList
          tasks={sortedTasks}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          onEdit={handleEdit}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </main>

      {/* Task Form Modal */}
      {isFormOpen && (
        <TaskForm
          onSubmit={editingTaskId ? handleEditTask : handleAddTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTaskId(null);
          }}
          initialData={
            editingTaskId
              ? (() => {
                  const task = tasks.find((t) => t.id === editingTaskId);
                  return task
                    ? {
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                        dueDate: task.dueDate,
                      }
                    : undefined;
                })()
              : undefined
          }
          isEditMode={!!editingTaskId}
        />
      )}
    </div>
  );
};
