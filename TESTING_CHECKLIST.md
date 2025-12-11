# Testing Checklist - Task Dashboard Application

## ✅ Form Validation Tests

### Title Field

- [ ] Empty title shows error: "Title is required"
- [ ] Title with 1 character shows error: "Title must be at least 3 characters"
- [ ] Title with 2 characters shows error: "Title must be at least 3 characters"
- [ ] Title with 3 characters is accepted ✓
- [ ] Title with 100 characters is accepted ✓
- [ ] Title with 101 characters shows error: "Title must not exceed 100 characters"
- [ ] Whitespace-only title shows error
- [ ] Error clears when user starts typing

### Description Field

- [ ] Empty description is accepted (optional field) ✓
- [ ] Description with 500 characters is accepted ✓
- [ ] Description with 501 characters shows error: "Description must not exceed 500 characters"
- [ ] Whitespace-only description is trimmed and saved
- [ ] Error clears when user starts typing

### Due Date Field

- [ ] Empty due date is accepted (optional field) ✓
- [ ] Past date shows error: "Due date cannot be in the past"
- [ ] Today's date is accepted ✓
- [ ] Future date is accepted ✓
- [ ] Date picker works correctly
- [ ] Error clears when user selects new date

### Priority Field

- [ ] Default priority is "medium" ✓
- [ ] Can select "low" ✓
- [ ] Can select "medium" ✓
- [ ] Can select "high" ✓
- [ ] Priority is always required (no empty option)

### Form Submission

- [ ] Submit button is clickable
- [ ] Form validates before submission
- [ ] Multiple errors display simultaneously
- [ ] Form closes after successful submission
- [ ] Cancel button closes form without saving
- [ ] Clicking outside form (overlay) closes it

---

## 🔍 Filtering Tests

### Status Filter

- [ ] "All" shows all tasks ✓
- [ ] "Pending" shows only pending tasks ✓
- [ ] "In Progress" shows only in-progress tasks ✓
- [ ] "Completed" shows only completed tasks ✓
- [ ] Filter persists when switching sort options
- [ ] Active filter badge appears when filter is applied
- [ ] Badge can be removed by clicking X

### Priority Filter

- [ ] "All" shows all tasks ✓
- [ ] "Low" shows only low priority tasks ✓
- [ ] "Medium" shows only medium priority tasks ✓
- [ ] "High" shows only high priority tasks ✓
- [ ] Filter persists when switching sort options
- [ ] Active filter badge appears when filter is applied
- [ ] Badge can be removed by clicking X

### Search Filter

- [ ] Empty search shows all tasks ✓
- [ ] Search matches task titles ✓
- [ ] Search matches task descriptions ✓
- [ ] Search is case-insensitive ✓
- [ ] Partial matches work ✓
- [ ] Special characters in search work
- [ ] Clear button (X) clears search input
- [ ] Active search query badge appears
- [ ] Badge can be removed by clicking X

### Combined Filters

- [ ] Status + Priority filters work together ✓
- [ ] Status + Search work together ✓
- [ ] Priority + Search work together ✓
- [ ] All three filters work together ✓
- [ ] "Clear All" button appears when filters are active
- [ ] "Clear All" removes all filters at once
- [ ] No filters = all tasks visible

---

## 📊 Sorting Tests

### Date Sorting

- [ ] Newest tasks appear first ✓
- [ ] Tasks created on same day are ordered correctly
- [ ] Sorting maintains filter results

### Priority Sorting

- [ ] High priority tasks appear first ✓
- [ ] Medium priority tasks appear second ✓
- [ ] Low priority tasks appear last ✓
- [ ] Tasks with same priority maintain stable order

### Status Sorting

- [ ] Pending tasks appear first ✓
- [ ] In-progress tasks appear second ✓
- [ ] Completed tasks appear last ✓
- [ ] Tasks with same status maintain stable order

### Title Sorting (Alphabetical)

- [ ] Tasks sorted A-Z ✓
- [ ] Case-insensitive sorting ✓
- [ ] Special characters handled correctly
- [ ] Numbers sorted correctly

### Sort Persistence

- [ ] Sort option persists when filtering
- [ ] Sort option persists when searching
- [ ] Sort dropdown shows current selection

---

## 🎯 Task CRUD Operations

### Create Task

- [ ] "Add New Task" button opens form ✓
- [ ] Form is empty/default values ✓
- [ ] Valid task is created successfully ✓
- [ ] New task appears at top of list ✓
- [ ] Task has unique ID ✓
- [ ] Task has correct createdAt timestamp ✓
- [ ] Task has default status "pending" ✓
- [ ] Form closes after creation ✓

### Read/Display Task

- [ ] Task card shows title ✓
- [ ] Task card shows description ✓
- [ ] Task card shows priority badge ✓
- [ ] Task card shows status ✓
- [ ] Task card shows due date (if set) ✓
- [ ] Task card shows created date ✓
- [ ] Priority badge has correct color ✓
- [ ] Status dropdown shows current status ✓

### Update Task

#### Edit Task Details

- [ ] Edit button (✏️) opens edit form ✓
- [ ] Form pre-fills with task data ✓
- [ ] Can update title ✓
- [ ] Can update description ✓
- [ ] Can update priority ✓
- [ ] Can update due date ✓
- [ ] Cannot change status (preserved) ✓
- [ ] Changes save successfully ✓
- [ ] Form closes after edit ✓
- [ ] Task ID remains unchanged ✓
- [ ] CreatedAt remains unchanged ✓

#### Change Task Status

- [ ] Status dropdown shows current status ✓
- [ ] Can change from "pending" to "in-progress" ✓
- [ ] Can change from "pending" to "completed" ✓
- [ ] Can change from "in-progress" to "pending" ✓
- [ ] Can change from "in-progress" to "completed" ✓
- [ ] Can change from "completed" to "pending" ✓
- [ ] Can change from "completed" to "in-progress" ✓
- [ ] Status updates immediately ✓
- [ ] Completed tasks show strikethrough title ✓
- [ ] Completed tasks have green border ✓

### Delete Task

- [ ] Delete button (🗑️) triggers confirmation ✓
- [ ] Confirmation dialog shows ✓
- [ ] "OK" deletes the task ✓
- [ ] "Cancel" keeps the task ✓
- [ ] Task removed from list immediately ✓
- [ ] Cannot undo deletion (no undo feature)

---

## 💾 Data Persistence Tests

### LocalStorage - Tasks

- [ ] Tasks persist after page refresh ✓
- [ ] New tasks saved to localStorage ✓
- [ ] Edited tasks saved to localStorage ✓
- [ ] Deleted tasks removed from localStorage ✓
- [ ] Status changes saved to localStorage ✓
- [ ] localStorage key is "tasks" ✓
- [ ] Data is valid JSON ✓

### LocalStorage - Theme

- [ ] Theme preference persists after refresh ✓
- [ ] Default theme is "light" ✓
- [ ] Theme toggles correctly ✓
- [ ] localStorage key is "theme" ✓

### Edge Cases

- [ ] Empty task list handled gracefully ✓
- [ ] Corrupted localStorage data handled
- [ ] localStorage disabled/unavailable handled
- [ ] Large number of tasks (100+) perform well

---

## 📤 Export/Import Tests

### Export Functionality

- [ ] Export button is clickable ✓
- [ ] Clicking export downloads file ✓
- [ ] File name includes timestamp ✓
- [ ] File extension is .json ✓
- [ ] File contains valid JSON ✓
- [ ] All task fields are exported ✓
- [ ] Empty task list exports as empty array ✓
- [ ] Special characters in tasks export correctly

### Import Functionality

- [ ] Import button opens file picker ✓
- [ ] Only JSON files can be selected
- [ ] Valid JSON file imports successfully ✓
- [ ] Confirmation dialog shows task count ✓
- [ ] "OK" imports tasks ✓
- [ ] "Cancel" does not import ✓
- [ ] Imported tasks added (not replaced) ✓
- [ ] Duplicate tasks (same ID) are skipped ✓
- [ ] Invalid JSON shows error message ✓
- [ ] Invalid task format shows error ✓
- [ ] File input resets after import

---

## 🎨 Theme & UI Tests

### Theme Toggle

- [ ] Toggle switch visible ✓
- [ ] Default theme is light ✓
- [ ] Clicking toggle switches theme ✓
- [ ] Sun icon visible in light mode ✓
- [ ] Moon icon visible in dark mode ✓
- [ ] Slider animates smoothly ✓
- [ ] All components update with theme ✓

### Light Theme

- [ ] Background gradient correct ✓
- [ ] Card backgrounds are white ✓
- [ ] Text is dark/readable ✓
- [ ] Buttons have correct colors ✓
- [ ] Borders visible ✓

### Dark Theme

- [ ] Background gradient correct ✓
- [ ] Card backgrounds are dark ✓
- [ ] Text is light/readable ✓
- [ ] Buttons have correct colors ✓
- [ ] Borders visible ✓
- [ ] No white flashes on theme change

---

## 📱 Responsive Design Tests

### Desktop (> 1024px)

- [ ] All features visible ✓
- [ ] Stats cards in grid layout ✓
- [ ] Filter controls side-by-side ✓
- [ ] Task cards have proper spacing ✓
- [ ] Form modal centered ✓
- [ ] No horizontal scrolling ✓

### Tablet (768px - 1024px)

- [ ] Layout adjusts appropriately ✓
- [ ] Stats cards resize ✓
- [ ] Filter controls stack if needed ✓
- [ ] Task cards remain readable ✓
- [ ] Touch targets adequate size ✓

### Mobile (< 768px)

- [ ] Single column layout ✓
- [ ] Stats cards stack vertically ✓
- [ ] Filter controls stack vertically ✓
- [ ] Search input full width ✓
- [ ] Buttons full width or stacked ✓
- [ ] Form modal full screen ✓
- [ ] Touch targets minimum 44px ✓
- [ ] No horizontal scrolling ✓
- [ ] Font sizes readable ✓

### Mobile - Portrait (< 600px)

- [ ] All text readable ✓
- [ ] Buttons accessible ✓
- [ ] Form inputs full width ✓
- [ ] Task cards compact but usable ✓
- [ ] No overlapping elements ✓

---

## ✨ Animation Tests

### Page Load Animations

- [ ] Dashboard fades in ✓
- [ ] Header slides in from top ✓
- [ ] Stats cards scale in with stagger ✓
- [ ] Task items slide in from left ✓
- [ ] Animations smooth (no jank) ✓

### Interaction Animations

- [ ] Buttons lift on hover ✓
- [ ] Task cards lift on hover ✓
- [ ] Form modal slides up ✓
- [ ] Theme toggle slider bounces ✓
- [ ] Status dropdown has transition ✓
- [ ] Filter badges pop in ✓
- [ ] Completed task pulses ✓

### Transition Smoothness

- [ ] Theme switch is smooth ✓
- [ ] Form open/close is smooth ✓
- [ ] Status change is smooth ✓
- [ ] All animations < 500ms ✓
- [ ] No animation delays user interaction

---

## 🧩 Component Integration Tests

### Dashboard → TaskList

- [ ] Tasks passed correctly ✓
- [ ] Handlers called correctly ✓
- [ ] Updates reflected in UI ✓

### Dashboard → TaskForm

- [ ] Form opens/closes correctly ✓
- [ ] Data passed for edit mode ✓
- [ ] Callbacks work correctly ✓

### Dashboard → TaskFilter

- [ ] Filters applied correctly ✓
- [ ] Filter changes update list ✓
- [ ] Clear all works ✓

### TaskList → TaskItem

- [ ] Individual tasks rendered ✓
- [ ] Actions work correctly ✓
- [ ] Props passed correctly ✓

---

## 🔐 Error Handling Tests

### Form Errors

- [ ] Validation errors display clearly ✓
- [ ] Multiple errors shown together ✓
- [ ] Errors clear appropriately ✓
- [ ] Error styling visible ✓

### Import Errors

- [ ] Invalid JSON handled ✓
- [ ] Missing fields handled ✓
- [ ] Error message shown ✓

### Edge Cases

- [ ] Empty task list shows message ✓
- [ ] Long task titles handled ✓
- [ ] Long descriptions handled ✓
- [ ] Special characters handled ✓
- [ ] Very old/future dates handled ✓

---

## 🎯 Statistics Tests

### Task Counts

- [ ] Total count is accurate ✓
- [ ] Pending count is accurate ✓
- [ ] In Progress count is accurate ✓
- [ ] Completed count is accurate ✓
- [ ] Counts update in real-time ✓
- [ ] Counts match filtered tasks

### Visual Display

- [ ] Each stat has distinct gradient ✓
- [ ] Stat cards are interactive (hover) ✓
- [ ] Numbers display correctly ✓
- [ ] Labels are clear ✓

---

## ⚡ Performance Tests

### Rendering Performance

- [ ] Initial load is fast ✓
- [ ] Task list renders quickly ✓
- [ ] Filtering is instantaneous ✓
- [ ] Sorting is instantaneous ✓
- [ ] No lag with 50+ tasks
- [ ] No lag with 100+ tasks

### Memory

- [ ] No memory leaks ✓
- [ ] LocalStorage size reasonable ✓
- [ ] Browser doesn't slow down ✓

---

## ♿ Accessibility Tests

### Keyboard Navigation

- [ ] Tab through all interactive elements
- [ ] Enter submits forms
- [ ] Escape closes modals
- [ ] Arrow keys work in dropdowns
- [ ] Focus indicators visible

### Screen Readers

- [ ] Form labels associated correctly
- [ ] Buttons have descriptive text
- [ ] Error messages announced
- [ ] Status changes announced

### Visual Accessibility

- [ ] Color contrast meets WCAG AA
- [ ] Text is readable
- [ ] Focus indicators visible
- [ ] No reliance on color alone

---

## 🌐 Browser Compatibility

### Chrome

- [ ] All features work ✓
- [ ] Animations smooth ✓
- [ ] LocalStorage works ✓

### Firefox

- [ ] All features work
- [ ] Animations smooth
- [ ] LocalStorage works

### Safari

- [ ] All features work
- [ ] Animations smooth
- [ ] LocalStorage works
- [ ] Date picker works

### Edge

- [ ] All features work
- [ ] Animations smooth
- [ ] LocalStorage works

---

## 📋 Summary

**Total Test Cases**: 250+

**Priority Levels**:

- 🔴 Critical: Core CRUD, Data Persistence, Form Validation
- 🟡 Important: Filtering, Sorting, Import/Export
- 🟢 Nice to Have: Animations, Advanced Accessibility

**Notes**:

- Tests marked with ✓ are expected to pass
- Use browser DevTools for debugging
- Test with real user scenarios
- Check console for errors/warnings
