import type {
  Task,
  FilterOptions,
  TaskFormData,
  ValidationResult,
  TaskFormErrors,
  SortOption,
  TaskStats,
} from "../types";

export const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// ============================================================================
// FILTERING
// ============================================================================

/**
 * Filters tasks based on the provided filter options
 * @param tasks - Array of tasks to filter
 * @param filters - Filter criteria (status, priority, search query)
 * @returns Filtered array of tasks
 */
export const filterTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
  return tasks.filter((task) => {
    // Filter by status
    if (filters.status !== "all" && task.status !== filters.status) {
      return false;
    }

    // Filter by priority
    if (filters.priority !== "all" && task.priority !== filters.priority) {
      return false;
    }

    // Filter by search query (searches in title and description)
    if (filters.searchQuery.trim() !== "") {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDescription = task.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
};

// ============================================================================
// SORTING
// ============================================================================

/**
 * Sorts tasks based on the provided sort option
 * @param tasks - Array of tasks to sort
 * @param sortBy - Sort criteria (date, priority, status, title)
 * @returns Sorted array of tasks (does not mutate original)
 */
export const sortTasks = (tasks: Task[], sortBy: SortOption): Task[] => {
  const tasksCopy = [...tasks];

  switch (sortBy) {
    case "date":
      // Sort by creation date (newest first)
      return tasksCopy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    case "priority":
      // Sort by priority (high → medium → low)
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return tasksCopy.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );

    case "status":
      // Sort by status (pending → in-progress → completed)
      const statusOrder = { pending: 0, "in-progress": 1, completed: 2 };
      return tasksCopy.sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status]
      );

    case "title":
      // Sort alphabetically by title
      return tasksCopy.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return tasksCopy;
  }
};

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validates task form data
 * @param data - Task form data to validate
 * @returns ValidationResult with isValid flag and errors object
 */
export const validateTask = (data: TaskFormData): ValidationResult => {
  const errors: TaskFormErrors = {};

  // Validate title
  if (!data.title.trim()) {
    errors.title = "Title is required";
  } else if (data.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (data.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  // Validate description
  if (data.description.length > 500) {
    errors.description = "Description must be less than 500 characters";
  }

  // Validate due date (if provided, must be in the future)
  if (data.dueDate) {
    const dueDate = new Date(data.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    if (dueDate < today) {
      errors.dueDate = "Due date cannot be in the past";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ============================================================================
// DATE FORMATTING
// ============================================================================

/**
 * Formats an ISO date string to a human-readable format
 * Shows relative dates for today, tomorrow, yesterday
 * @param isoDate - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (isoDate: string | null): string => {
  if (!isoDate) return "No due date";

  const date = new Date(isoDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time for comparison
  const resetTime = (d: Date) => {
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const dateOnly = resetTime(new Date(date));
  const todayOnly = resetTime(new Date(today));
  const tomorrowOnly = resetTime(new Date(tomorrow));
  const yesterdayOnly = resetTime(new Date(yesterday));

  // Check for relative dates
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return "Today";
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return "Tomorrow";
  } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return "Yesterday";
  }

  // Format as "Dec 10, 2025"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Formats an ISO date string for datetime-local input
 * @param isoDate - ISO date string
 * @returns Date string in YYYY-MM-DD format
 */
export const formatDateForInput = (isoDate: string | null): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0];
};

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Calculates statistics for an array of tasks
 * @param tasks - Array of tasks
 * @returns TaskStats object with counts
 */
export const calculateStats = (tasks: Task[]): TaskStats => {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };
};

export const createTask = (formData: TaskFormData): Task => {
  return {
    id: generateId(),
    title: formData.title.trim(),
    description: formData.description.trim(),
    priority: formData.priority,
    dueDate: formData.dueDate,
    status: "pending", // New tasks start as pending
    createdAt: new Date().toISOString(),
  };
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};

export const loadTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem("tasks");
    if (!stored) return [];
    return JSON.parse(stored) as Task[];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
};

export const exportTasksToJSON = (tasks: Task[]): void => {
  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `tasks-${new Date().toISOString().split("T")[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importTasksFromJSON = (jsonString: string): Task[] | null => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) return null;

    // Validate that each item has required Task properties
    const isValid = parsed.every(
      (item) =>
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.status === "string" &&
        typeof item.priority === "string"
    );

    return isValid ? (parsed as Task[]) : null;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};
