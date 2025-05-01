const API_URL = "http://localhost:3000"; // Change this to your deployed backend URL

// Add a new task
async function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    if (!taskInput) {
        alert("Please enter a task");
        return;
    }
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskInput })
    });
    const data = await response.json();
    renderTasks();  // Re-fetch and render tasks after adding a new one
}

// Fetch all tasks and render them
async function fetchTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();
    return tasks;
}

// Render tasks on the UI
async function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';  // Clear the list before rendering

    const tasks = await fetchTasks();
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.title} 
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="editTask(${task.id})">Edit</button>
        `;
        taskList.appendChild(li);
    });
}

// Edit a task
async function editTask(id) {
    const newTitle = prompt("Enter the new task title:");
    if (!newTitle) return;  // If no title is entered, exit the function

    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle })
    });
    const data = await response.json();
    renderTasks();  // Re-fetch and render tasks after editing one
}

// Delete a task
async function deleteTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    renderTasks();  // Re-fetch and render tasks after deletion
}

// Fetch and display the motivational quote
async function fetchQuote() {
    const response = await fetch(`${API_URL}/quote`);
    const data = await response.json();
    document.getElementById("quoteText").innerText = `"${data.q}" - ${data.a}`;
}

// Fetch weather data
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const response = await fetch(`${API_URL}/weather?city=${city}`);
    const data = await response.json();
    document.getElementById("weatherData").innerText = `Temperature: ${data.main.temp}°C`;
}

// Initial fetch for quote and tasks when the page loads
fetchQuote();
renderTasks(); // Initial rendering of tasks
