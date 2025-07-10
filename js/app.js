const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

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

  const li = document.createElement("li");

  li.innerHTML = `
    <span class="todo-text">${todoText}</span>
    <button class="delete"><i title="Delete Task" class="fa fa-trash"></i></button>
  `;

  // Add event listeners
  li.querySelector(".todo-text").addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  li.querySelector(".delete").addEventListener("click", function () {
    li.remove();
  });

  todoList.appendChild(li);
  input.value = "";
}
