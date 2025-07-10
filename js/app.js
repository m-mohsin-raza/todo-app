const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

addBtn.addEventListener("click", addTodo) ;

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
} );

function addTodo() {
    const todoText = input.value.trim();
    if (todoText === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = '<span class="todo-text">' + todoText + '</span>';
    todoList.appendChild(li);

    input.value = ""; // Clear the input field


    // const deleteBtn = document.createElement("button");
    // deleteBtn.textContent = "Delete";
    // deleteBtn.className = "delete-btn";
    // deleteBtn.addEventListener("click", function() {
    //     todoList.removeChild(todoItem);
    // });

    // todoItem.appendChild(deleteBtn);
    // todoList.appendChild(todoItem);

    // input.value = "";
}