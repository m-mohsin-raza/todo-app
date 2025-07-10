/**
 * TODO APPLICATION - CORE FUNCTIONALITY
 * 
 * This script handles all the functionality for a todo application including:
 * - Adding new tasks
 * - Marking tasks as complete
 * - Deleting tasks
 * - Filtering tasks (all/active/completed)
 * - Persisting tasks to localStorage
 * - Task count display
 */

// DOM Element References
const input = document.getElementById("todo-input");        // Input field for new tasks
const addBtn = document.getElementById("add-btn");         // Button to add new task
const todoList = document.getElementById("todo-list");     // Container for todo items
const taskCount = document.getElementById("task-count");    // Element showing remaining tasks count
const filters = document.querySelectorAll(".filter-btn");   // Filter buttons (all/active/completed)
const clearBtn = document.getElementById("clear-completed"); // Button to clear completed tasks

// Application State
let currentFilter = "all";     // Tracks which filter is currently active
let todos = [];                // Array holding all todo items

/**
 * INITIALIZATION
 * Runs when DOM is fully loaded
 */
window.addEventListener("DOMContentLoaded", () => {
  // Load todos from localStorage if they exist
  const stored = localStorage.getItem("todos");
  if (stored) {
    todos = JSON.parse(stored);
    todos.forEach(renderTodo);  // Render each stored todo
  }
  
  updateTaskCount();           // Initialize task count display
  setupEventListeners();       // Set up all event listeners
});

/**
 * SETUP EVENT LISTENERS
 * Configures all interactive elements
 */
function setupEventListeners() {
  // Add new todo when button is clicked
  addBtn.addEventListener("click", addTodo);
  
  // Add new todo when Enter key is pressed
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });
  
  // Set up filter buttons
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active filter button styling
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Set new filter and update display
      currentFilter = btn.dataset.filter;
      filterTodos();
    });
  });
  
  // Clear completed tasks
  clearBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);  // Remove completed tasks
    saveTodos();                                    // Save to localStorage
    refreshList();                                  // Update UI
  });
}

/**
 * REFRESH THE TODO LIST
 * Clears and re-renders the entire list
 * Useful after bulk operations
 */
function refreshList() {
  todoList.innerHTML = "";      // Clear current list
  todos.forEach(renderTodo);    // Re-render all todos
  updateTaskCount();           // Update counter
  filterTodos();               // Apply current filter
}

/**
 * ADD NEW TODO ITEM
 * Creates a new todo from input field value
 */
function addTodo() {
  const todoText = input.value.trim();  // Get and clean input
  
  // Validate input
  if (todoText === "") {
    alert("Please enter a task!");
    return;
  }
  
  // Create new todo object
  const todoItem = {
    id: Date.now(),         // Unique ID using timestamp
    text: todoText,         // Task text
    completed: false        // Initial completion state
  };
  
  todos.push(todoItem);     // Add to todos array
  saveTodos();              // Persist to localStorage
  renderTodo(todoItem);     // Display new todo
  input.value = '';         // Clear input field
  updateTaskCount();        // Update remaining tasks count
}

/**
 * UPDATE TASK COUNTER DISPLAY
 * Shows how many tasks remain incomplete
 */
function updateTaskCount() {
  const activeCount = todos.filter(todo => !todo.completed).length;
  // Pluralize correctly (task vs tasks)
  taskCount.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;
}

/**
 * FILTER TODOS BASED ON CURRENT FILTER
 * Shows/hides items according to active filter
 */
function filterTodos() {
  document.querySelectorAll("#todo-list li").forEach(li => {
    const id = Number(li.getAttribute("data-id"));
    const todo = todos.find(t => t.id === id);  // Find corresponding todo object
    
    // Apply filter logic
    switch (currentFilter) {
      case "active":
        li.style.display = todo.completed ? "none" : "flex";
        break;
      case "completed":
        li.style.display = todo.completed ? "flex" : "none";
        break;
      default:  // "all" filter
        li.style.display = "flex";
    }
  });
}

/**
 * SAVE TODOS TO LOCALSTORAGE
 * Persists the current state of todos
 */
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * RENDER A SINGLE TODO ITEM
 * Creates DOM elements for a todo and adds to list
 * @param {Object} todoItem - The todo object to render
 */
function renderTodo(todoItem) {
  // Create list item container
  const li = document.createElement("li");
  li.setAttribute("data-id", todoItem.id);
  if (todoItem.completed) li.classList.add("completed");
  
  // Create task text element
  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = todoItem.text;
  
  // Create delete button
  const button = document.createElement("button");
  button.className = "delete";
  button.title = "Delete Task";
  
  // Add trash icon to delete button
  const icon = document.createElement("i");
  icon.className = "fa fa-trash";
  button.appendChild(icon);
  
  // TOGGLE COMPLETION - Click on task text
  span.addEventListener("click", () => {
    li.classList.toggle("completed");          // Update visual state
    todoItem.completed = !todoItem.completed;  // Update data model
    saveTodos();                               // Persist changes
    updateTaskCount();                         // Update counter
  });
  
  // DELETE TASK - Click on delete button
  button.addEventListener("click", () => {
    todos = todos.filter((t) => t.id !== todoItem.id);  // Remove from array
    saveTodos();                                        // Persist changes
    li.remove();                                        // Remove from DOM
    updateTaskCount();                                  // Update counter
  });
  
  // Assemble and add to DOM
  li.appendChild(span);
  li.appendChild(button);
  todoList.prepend(li);  // Add at beginning of list (newest first)
}