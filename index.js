let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');