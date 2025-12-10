// ============================================================================
// CORE DATA TYPES
// ============================================================================

/**
 * Possible states a task can be in
 */
export type TaskStatus = "pending" | "in-progress" | "completed";

/**
 * Priority levels for tasks
 */
export type TaskPriority = "low" | "medium" | "high";

/**
 * Options for sorting tasks
 */
export type SortOption = "date" | "priority" | "status" | "title";

/**
 * Theme options for the application
 */
export type Theme = "light" | "dark";

/**
 * Main Task interface - represents a single task in the system
 */
export interface Task {
  id: string; // Unique identifier (UUID)
  title: string; // Task title (required)
  description: string; // Detailed description
  status: TaskStatus; // Current status
  priority: TaskPriority; // Priority level
  dueDate: string | null; // ISO date string or null if no deadline
  createdAt: string; // ISO date string of creation time
}

/**
 * Form data for creating/editing tasks (before id and createdAt are assigned)
 */
export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string | null;
}

/**
 * Filter options for task list
 */
export interface FilterOptions {
  status: TaskStatus | "all"; // Filter by status or show all
  priority: TaskPriority | "all"; // Filter by priority or show all
  searchQuery: string; // Text search query
}

/**
 * Statistics about tasks
 */
export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

// ============================================================================
// COMPONENT PROPS INTERFACES
// ============================================================================

/**
 * Props for TaskItem component - individual task card/row
 */
export interface TaskItemProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

/**
 * Props for TaskForm component - form for adding/editing tasks
 */
export interface TaskFormProps {
  onSubmit: (taskData: TaskFormData) => void;
  onCancel: () => void;
  initialData?: TaskFormData; // For edit mode
  isEditMode?: boolean; // Whether we're editing or creating
}

/**
 * Props for TaskFilter component - filtering and search controls
 */
export interface TaskFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

/**
 * Props for TaskList component - list of tasks with operations
 */
export interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  sortBy: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

/**
 * Props for Dashboard component - main container
 */
export interface DashboardProps {
  initialTasks?: Task[]; // Optional initial tasks for testing
}

// ============================================================================
// VALIDATION & ERROR TYPES
// ============================================================================

/**
 * Validation errors for task form
 */
export interface TaskFormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

/**
 * Result of task validation
 */
export interface ValidationResult {
  isValid: boolean;
  errors: TaskFormErrors;
}
