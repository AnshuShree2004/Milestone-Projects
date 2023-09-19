// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="card">

        <span class="${task.completed ? 'completed' : ''}">
         <h4>${index+1}. ${task.text}</h4> 
         </span>

        <p> Status: ${task.completed ? 'Complete' : 'Pending'} </p>

        <button onclick="toggleCompletion(${index})">Update Status</button>

        <button onclick="deleteTask(${index})">Remove</button>
         </div>
           
        `;
        taskList.appendChild(listItem);
    });
}

// Save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskText = taskInput.value.trim();

    if (newTaskText === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: newTaskText, completed: false });

    saveTasks(tasks);
    taskInput.value = '';
    loadTasks();
}

// Toggle task completion
function toggleCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

// Delete a task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

// Initial load of tasks
loadTasks();
