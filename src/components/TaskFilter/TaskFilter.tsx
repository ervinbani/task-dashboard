import type { TaskFilterProps, TaskStatus, TaskPriority } from "../../types";
import "./TaskFilter.css";

/**
 * TaskFilter Component
 * Provides filtering controls for tasks by status, priority, and search
 */
export const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchQuery: e.target.value,
    });
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      status: e.target.value as TaskStatus | "all",
    });
  };

  // Handle priority filter change
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      priority: e.target.value as TaskPriority | "all",
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    onFilterChange({
      status: "all",
      priority: "all",
      searchQuery: "",
    });
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.searchQuery.trim() !== "";

  return (
    <div className="task-filter">
      {/* Search Bar */}
      <div className="filter-search">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {filters.searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => onFilterChange({ ...filters, searchQuery: "" })}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        {/* Status Filter */}
        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusChange}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-group">
          <label htmlFor="priority-filter" className="filter-label">
            Priority
          </label>
          <select
            id="priority-filter"
            value={filters.priority}
            onChange={handlePriorityChange}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            className="clear-filters-btn"
            onClick={handleClearFilters}
            title="Clear all filters"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Active filters:</span>
          {filters.status !== "all" && (
            <span className="filter-badge">
              Status: {filters.status}
              <button
                className="remove-filter"
                onClick={() => onFilterChange({ ...filters, status: "all" })}
              >
                ✕
              </button>
            </span>
          )}
          {filters.priority !== "all" && (
            <span className="filter-badge">
              Priority: {filters.priority}
              <button
                className="remove-filter"
                onClick={() => onFilterChange({ ...filters, priority: "all" })}
              >
                ✕
              </button>
            </span>
          )}
          {filters.searchQuery && (
            <span className="filter-badge">
              Search: "{filters.searchQuery}"
              <button
                className="remove-filter"
                onClick={() => onFilterChange({ ...filters, searchQuery: "" })}
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
