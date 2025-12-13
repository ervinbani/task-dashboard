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
- npm

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ervinbani/task-dashboard.git
   cd task-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install

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

2. **Priority Filter**

3. **Search Filter**

4. **Sorting**

5. **Combined Filters**

### Component Interactions

1. **Create Task**

2. **Edit Task**

3. **Delete Task**

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

### Responsive Design Testing

1. **Desktop (> 768px)**

2. **Tablet (600px - 768px)**

3. **Mobile (< 600px)**

### LocalStorage Persistence

1. **Create tasks** → Refresh page → Tasks persist
2. **Change theme** → Refresh page → Theme persists
3. **Apply filters** → Refresh page → Filters reset (expected)
4. **Edit task** → Refresh page → Changes persist

## 📁 Project Structure

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
