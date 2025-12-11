import "./ThemeToggle.css";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

/**
 * ThemeToggle Component
 * Toggle switch for changing between light and dark mode
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
}) => {
  return (
    <div className="theme-toggle">
      <span className="theme-toggle-label">☀️</span>
      <label className={`toggle-switch ${theme === "dark" ? "active" : ""}`}>
        <input
          type="checkbox"
          className="toggle-input"
          checked={theme === "dark"}
          onChange={onToggle}
        />
        <span className="toggle-slider"></span>
      </label>
      <span className="theme-toggle-label">🌙</span>
    </div>
  );
};
