let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item flex justify-between items-center p-2 bg-white rounded shadow ${
      task.completed ? "completed" : ""
    }`;
    li.innerHTML = `<div class="flex items-center gap-2">
          <input type="checkbox" ${
            task.completed ? "checked" : ""
          } class="h-4 w-4 text-blue-500" />
          <span>${task.text}</span>
          </div>
        <button class="text-red-500 hover:text-red-600 text-sm">Delete</button>`;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();
