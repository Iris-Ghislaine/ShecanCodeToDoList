let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("task-category");
const prioritySelect = document.getElementById("task-priority");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function getPriorityClass(priority) {
  if (priority === "High") return "bg-red-500 text-white";
  if (priority === "Medium") return "bg-yellow-400 text-black";
  return "bg-green-500 text-white"; // Low
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item flex justify-between items-center p-2 bg-white rounded shadow ${
      task.completed ? "completed" : ""
    }`;

    if (task.editing) {
      // edit mode
      li.innerHTML = `
        <div class="flex flex-col gap-2 flex-1">
          <input type="text" id="edit-input-${index}" 
            value="${task.text}" 
            class="p-1 border border-gray-300 rounded" />
          <select id="edit-category-${index}" class="p-1 border border-gray-300 rounded">
            <option value="Work" ${task.category === "Work" ? "selected" : ""}>Work</option>
            <option value="Personal" ${task.category === "Personal" ? "selected" : ""}>Personal</option>
            <option value="School" ${task.category === "School" ? "selected" : ""}>School</option>
          </select>
          <select id="edit-priority-${index}" class="p-1 border border-gray-300 rounded">
            <option value="High" ${task.priority === "High" ? "selected" : ""}>High</option>
            <option value="Medium" ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
            <option value="Low" ${task.priority === "Low" ? "selected" : ""}>Low</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button class="text-blue-500 hover:text-blue-600 text-sm" onclick="saveEdit(${index})">Save</button>
          <button class="text-gray-500 hover:text-gray-600 text-sm" onclick="cancelEdit(${index})">Cancel</button>
        </div>
      `;
    } else {
      // normal mode
      li.innerHTML = `
        <div class="flex items-center gap-2 flex-wrap">
          <input type="checkbox" 
            ${task.completed ? "checked" : ""} 
            class="h-4 w-4 text-blue-500" 
            onchange="toggleTask(${index})" />
          <span>${task.text}</span>
          <span class="ml-2 px-2 py-1 text-xs rounded bg-gray-200">${task.category}</span>
          <span class="ml-1 px-2 py-1 text-xs rounded ${getPriorityClass(task.priority)}">${task.priority}</span>
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
  const category = categorySelect.value;
  const priority = prioritySelect.value;
  if (text) {
    tasks.push({ text, category, priority, completed: false, editing: false });
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
  const categoryInput = document.getElementById(`edit-category-${index}`);
  const priorityInput = document.getElementById(`edit-priority-${index}`);
  if (input) {
    tasks[index].text = input.value.trim() || tasks[index].text;
  }
  if (categoryInput) {
    tasks[index].category = categoryInput.value;
  }
  if (priorityInput) {
    tasks[index].priority = priorityInput.value;
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
