const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let todos = [];

window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("todos");
  if (stored) {
    todos = JSON.parse(stored);
    todos.forEach(renderTodo);
  }
    setupEventListeners();
});

function setupEventListeners() {
    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addTodo();
      }
    });
}

function addTodo() {
  const todoText = input.value.trim();

  if (todoText === "") {
    alert("Please enter a task!");
    return;
  }

  const todoItem = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };

  todos.push(todoItem);
  saveTodos();
  renderTodo(todoItem);
  input.value = '';
}


function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodo(todoItem) {
  const li = document.createElement("li");
  li.setAttribute("data-id", todoItem.id);
  if (todoItem.completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = todoItem.text;

  const button = document.createElement("button");
  button.className = "delete";
  button.title = "Delete Task";

  const icon = document.createElement("i");
  icon.className = "fa fa-trash";
  button.appendChild(icon);

  // Event Listeners
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    todoItem.completed = !todoItem.completed;
    saveTodos();
  });

  button.addEventListener("click", () => {
    todos = todos.filter((t) => t.id !== todoItem.id);
    saveTodos();
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(button);
  todoList.prepend(li);
}


