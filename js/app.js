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
});

addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

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

  li.innerHTML = `
    <span class="todo-text">${todoItem.text}</span>
    <button class="delete" title="Delete Task">
      <i class="fa fa-trash"></i>
    </button>
  `;

  li.querySelector(".todo-text").addEventListener("click", function () {
    li.classList.toggle("completed");
    todoItem.completed = !todoItem.completed;
    saveTodos();
  });

  li.querySelector(".delete").addEventListener("click", function () {
    todos = todos.filter((t) => t.id !== todoItem.id);
    saveTodos();
    li.remove();
  });

  todoList.appendChild(li);
}

