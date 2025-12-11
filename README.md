# Task Dashboard Application

A modern, feature-rich task management application built with React, TypeScript, and Vite.

## 🚀 Features

- **Task Management**: Create, edit, delete, and manage tasks with ease
- **Status Tracking**: Track task progress (Pending, In Progress, Completed)
- **Priority Levels**: Organize tasks by priority (Low, Medium, High)
- **Advanced Filtering**: Filter tasks by status, priority, and search query
- **Smart Sorting**: Sort tasks by date, priority, status, or title
- **Data Persistence**: Automatic localStorage persistence (no server required)
- **Import/Export**: Export tasks to JSON and import from files
- **Dark/Light Mode**: Seamless theme switching with preference persistence
- **Form Validation**: Comprehensive validation for task inputs
- **Responsive Design**: Mobile-friendly interface with smooth animations
- **Statistics Dashboard**: Real-time task statistics and metrics

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with CSS variables for theming
- **LocalStorage API** - Client-side data persistence

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ervinbani/task-dashboard.git
   cd task-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

The production-ready files will be in the `dist` folder.

## 🧪 Testing Guide

### Form Validation Testing

1. **Title Validation**

   - Try submitting with empty title → Should show error
   - Enter title with less than 3 characters → Should show error
   - Enter title with more than 100 characters → Should show error
   - Enter valid title (3-100 chars) → Should accept

2. **Description Validation**

   - Leave description empty → Should allow (optional field)
   - Enter description with more than 500 characters → Should show error
   - Enter valid description → Should accept

3. **Due Date Validation**

   - Select a past date → Should show error
   - Select today's date → Should accept
   - Select future date → Should accept
   - Leave empty → Should accept (optional)

4. **Priority Selection**
   - All priority options should be selectable
   - Default should be "Medium"

### Filtering & Sorting Testing

1. **Status Filter**

   - Select "Pending" → Shows only pending tasks
   - Select "In Progress" → Shows only in-progress tasks
   - Select "Completed" → Shows only completed tasks
   - Select "All" → Shows all tasks

2. **Priority Filter**

   - Select "High" → Shows only high priority tasks
   - Select "Medium" → Shows only medium priority tasks
   - Select "Low" → Shows only low priority tasks
   - Select "All" → Shows all tasks

3. **Search Filter**

   - Type in search box → Filters tasks by title and description
   - Clear search → Shows all tasks (respecting other filters)

4. **Sorting**

   - Sort by Date → Newest tasks first
   - Sort by Priority → High → Medium → Low
   - Sort by Status → Pending → In Progress → Completed
   - Sort by Title → Alphabetical order

5. **Combined Filters**
   - Apply multiple filters simultaneously
   - Verify active filter badges appear
   - Click "Clear All" → Removes all filters

### Component Interactions

1. **Create Task**

   - Click "Add New Task" button
   - Fill form and submit → Task appears in list
   - Click "Cancel" → Form closes without saving

2. **Edit Task**

   - Click edit button (✏️) on any task
   - Form opens with pre-filled data
   - Modify and submit → Changes are saved
   - Cancel → No changes applied

3. **Delete Task**

   - Click delete button (🗑️) on any task
   - Confirmation dialog appears
   - Confirm → Task is removed
   - Cancel → Task remains

4. **Change Status**

   - Use status dropdown on task card
   - Select new status → Updates immediately
   - Completed tasks show strikethrough title
   - Status badge updates accordingly

5. **Export/Import**

   - Click "Export" → Downloads JSON file
   - Click "Import" → Opens file picker
   - Select valid JSON file → Tasks are added (not replaced)
   - Try invalid file → Shows error message

6. **Theme Toggle**
   - Click theme toggle switch
   - Theme changes immediately
   - Preference is saved to localStorage
   - Refresh page → Theme persists

### Responsive Design Testing

1. **Desktop (> 768px)**

   - All features visible
   - Multi-column layout for stats
   - Side-by-side filter controls

2. **Tablet (600px - 768px)**

   - Responsive grid adjustments
   - Task cards stack appropriately
   - Buttons remain accessible

3. **Mobile (< 600px)**
   - Single column layout
   - Touch-friendly buttons
   - Form fills screen
   - Horizontal scrolling prevented

### LocalStorage Persistence

1. **Create tasks** → Refresh page → Tasks persist
2. **Change theme** → Refresh page → Theme persists
3. **Apply filters** → Refresh page → Filters reset (expected)
4. **Edit task** → Refresh page → Changes persist

## 📁 Project Structure

```
task-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx       # Main container component
│   │   │   └── Dashboard.css       # Dashboard styles
│   │   ├── TaskList/
│   │   │   ├── TaskList.tsx        # Task list container
│   │   │   ├── TaskList.css        # List styles
│   │   │   ├── TaskItem.tsx        # Individual task card
│   │   │   └── TaskItem.css        # Task item styles
│   │   ├── TaskForm/
│   │   │   ├── TaskForm.tsx        # Create/Edit form
│   │   │   └── TaskForm.css        # Form styles
│   │   ├── TaskFilter/
│   │   │   ├── TaskFilter.tsx      # Filter controls
│   │   │   └── TaskFilter.css      # Filter styles
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.tsx     # Theme switcher
│   │       └── ThemeToggle.css     # Toggle styles
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── utils/
│   │   └── taskUtils.ts            # Utility functions
│   ├── App.tsx                     # Root component
│   ├── App.css                     # Global styles
│   └── main.tsx                    # Entry point
├── public/                         # Static assets
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
└── README.md                       # This file
```

## 🎯 Component Documentation

### Dashboard Component

**Purpose**: Main application container that manages global state

**State Management**:

- `tasks` - Array of all tasks
- `filters` - Current filter settings
- `sortBy` - Current sort option
- `isFormOpen` - Form visibility state
- `editingTaskId` - ID of task being edited
- `theme` - Current theme (light/dark)

**Key Features**:

- Centralized state management
- LocalStorage integration
- Task CRUD operations
- Export/Import functionality

### TaskForm Component

**Purpose**: Create and edit tasks with validation

**Props**:

- `onSubmit: (data: TaskFormData) => void` - Callback when form is submitted
- `onCancel: () => void` - Callback when form is cancelled
- `initialData?: TaskFormData` - Pre-fill data for editing
- `isEditMode?: boolean` - Whether form is in edit mode

**Validation Rules**:

- Title: Required, 3-100 characters
- Description: Optional, max 500 characters
- Due Date: Optional, must be today or future
- Priority: Required, one of: low, medium, high

### TaskList Component

**Purpose**: Display filtered and sorted tasks

**Props**:

- `tasks: Task[]` - Array of tasks to display
- `onToggleStatus: (id, status) => void` - Status change handler
- `onDelete: (id) => void` - Delete handler
- `onEdit: (id) => void` - Edit handler
- `sortBy: SortOption` - Current sort option
- `onSortChange: (option) => void` - Sort change handler

### TaskItem Component

**Purpose**: Individual task card with actions

**Props**:

- `task: Task` - Task data to display
- `onToggleStatus: (id, status) => void` - Status change handler
- `onDelete: (id) => void` - Delete handler
- `onEdit: (id) => void` - Edit handler

**Features**:

- Status dropdown for direct selection
- Priority and status badges
- Edit and delete actions
- Strikethrough for completed tasks

### TaskFilter Component

**Purpose**: Filter and search controls

**Props**:

- `filters: FilterOptions` - Current filter state
- `onFilterChange: (filters) => void` - Filter update handler

**Features**:

- Search input (searches title and description)
- Status dropdown filter
- Priority dropdown filter
- Active filter badges
- Clear all filters button

### ThemeToggle Component

**Purpose**: Switch between light and dark themes

**Props**:

- `theme: Theme` - Current theme
- `onThemeChange: (theme) => void` - Theme change handler

**Features**:

- Animated toggle switch
- Sun/Moon icons
- Persists to localStorage

## 🎨 Theming

The application uses CSS variables for theming:

**Light Theme**:

- Background: Gradient (#f5f7fa to #c3cfe2)
- Card Background: #ffffff
- Text: #333

**Dark Theme**:

- Background: Gradient (#1a1a2e to #16213e)
- Card Background: #0f3460
- Text: #e0e0e0

## 🔑 Key TypeScript Types

```typescript
// Task object structure
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
}

// Status options
type TaskStatus = "pending" | "in-progress" | "completed";

// Priority levels
type TaskPriority = "low" | "medium" | "high";

// Sort options
type SortOption = "date" | "priority" | "status" | "title";
```

## ⚡ Performance Optimizations

- **No useEffect**: Uses `useState` lazy initialization for localStorage
- **Component Composition**: Small, focused components
- **CSS Variables**: Instant theme switching
- **Animations**: GPU-accelerated CSS transitions
- **No External Dependencies**: Lightweight bundle size

## 🐛 Troubleshooting

**Tasks not persisting?**

- Check browser localStorage is enabled
- Check browser console for errors
- Try clearing localStorage and refreshing

**Import not working?**

- Ensure JSON file follows correct format
- Check file contains valid task objects
- Verify required fields are present

**Theme not changing?**

- Check localStorage permissions
- Refresh the page
- Try clearing browser cache

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 👤 Author

Ervin Bani

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📚 Learning Resources

This project demonstrates:

- React Hooks (useState)
- TypeScript with React
- Component composition
- State management patterns
- Form validation
- LocalStorage API
- CSS animations
- Responsive design
- Import/Export functionality

---

Built with ❤️ using React + TypeScript + Vite

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
