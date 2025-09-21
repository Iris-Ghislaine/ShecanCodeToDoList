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

    // check if this task is in "edit mode"
    if (task.editing) {
      li.innerHTML = `
        <div class="flex items-center gap-2 flex-1">
          <input type="text" id="edit-input-${index}" 
            value="${task.text}" 
            class="flex-1 p-1 border border-gray-300 rounded" />
        </div>
        <div class="flex gap-2">
          <button class="text-blue-500 hover:text-blue-600 text-sm" onclick="saveEdit(${index})">Save</button>
          <button class="text-gray-500 hover:text-gray-600 text-sm" onclick="cancelEdit(${index})">Cancel</button>
        </div>
      `;
    } else {
      li.innerHTML = `
        <div class="flex items-center gap-2">
          <input type="checkbox" 
            ${task.completed ? "checked" : ""} 
            class="h-4 w-4 text-blue-500" 
            onchange="toggleTask(${index})" />
          <span>${task.text}</span>
        </div>
        <div class="flex gap-2">
          <button class="text-green-500 hover:text-green-600 text-sm" onclick="editTask(${index})">Edit</button>
          <button class="text-red-500 hover:text-red-600 text-sm" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
    }

    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false, editing: false });
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  tasks[index].editing = true;
  renderTasks();
}

function saveEdit(index) {
  const input = document.getElementById(`edit-input-${index}`);
  if (input) {
    tasks[index].text = input.value.trim() || tasks[index].text;
  }
  tasks[index].editing = false;
  renderTasks();
}

function cancelEdit(index) {
  tasks[index].editing = false;
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();
