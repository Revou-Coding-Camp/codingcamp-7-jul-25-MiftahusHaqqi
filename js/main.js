// 1. Ambil elemen HTML
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// 2. Ambil todos dari localStorage saat halaman dimuat
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 3. Tampilkan todos saat halaman pertama kali dibuka
displayTodos();

// 4. Event: Tambah todo baru
addButton.addEventListener("click", addTodo);

// 5. Fungsi tambah todo
function addTodo() {
  const task = taskInput.value.trim();
  const dueDate = dateInput.value;

  if (task === "") {
    alert("Task name cannot be empty!");
    return;
  }

  const todo = {
    id: Date.now(),
    task: task,
    dueDate: dueDate,
    completed: false,
  };

  todos.push(todo);
  saveTodos(); // simpan ke localStorage
  taskInput.value = "";
  dateInput.value = "";
  displayTodos();
}

// 6. Fungsi tampilkan todos
function displayTodos(data = todos) {
  todoList.innerHTML = "";

  if (data.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4">No tasks found</td></tr>`;
    return;
  }

  data.forEach((todo) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.dueDate || "-"}</td>
      <td>${todo.completed ? "Completed" : "Pending"}</td>
      <td>
        <button class="toggle-btn" data-id="${todo.id}">Update</button>
        <button class="delete-btn" data-id="${todo.id}">Delete</button>
      </td>
    `;

    // Tambahkan event listener ke tombol
    row.querySelector(".toggle-btn").addEventListener("click", () => toggleStatus(todo.id));
    row.querySelector(".delete-btn").addEventListener("click", () => deleteTodo(todo.id));

    todoList.appendChild(row);
  });
}

// 7. Fungsi toggle status
function toggleStatus(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos();
  displayTodos();
}

// 8. Fungsi hapus todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  displayTodos();
}

// 9. Fungsi clear all
function clearAll() {
  todos = [];
  saveTodos();
  displayTodos();
}

// 10. Fungsi filter
function filterTodos(status) {
  let filteredTodos;

  if (status === "all") {
    filteredTodos = todos;
  } else if (status === "pending") {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (status === "completed") {
    filteredTodos = todos.filter(todo => todo.completed);
  } else {
    filteredTodos = [];
  }

  displayTodos(filteredTodos);
}

// 11. Simpan todos ke localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
