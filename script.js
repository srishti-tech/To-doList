    document.addEventListener("DOMContentLoaded", () => {
    const taskTitle = document.getElementById("task-title");
    const taskDesc = document.getElementById("task-desc");
    const taskDate = document.getElementById("task-date");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const filterBtns = document.querySelectorAll(".filter-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let isDarkMode = localStorage.getItem("darkMode") === "true";
  
    const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));
    const saveDarkMode = () => localStorage.setItem("darkMode", isDarkMode);
  
    const renderTasks = (filter = "all") => {
      taskList.innerHTML = "";
      tasks
        .filter(task => filter === "all" || (filter === "completed" && task.completed) || (filter === "pending" && !task.completed))
        .forEach((task, index) => {
          const li = document.createElement("li");
          li.className = task.completed ? "completed" : "";
          li.innerHTML = `
            <span>
              <strong>${task.title}</strong> (${task.date || "No due date"})
              <br>
              <small>${task.description}</small>

            </span>
            <div>
              <button onclick="toggleComplete(${index})"><i class="fas fa-check"></i></button>
              <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
              <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
            </div>
          `;
          taskList.appendChild(li);
        });
    };
 
    const addTask = () => {
      const title = taskTitle.value.trim();
      const description = taskDesc.value.trim();
      const date = taskDate.value;
      if (!title) return alert("Task title is required!");
      tasks.push({ title, description, date, completed: false });
      saveTasks();
      renderTasks();
      taskTitle.value = "";
      taskDesc.value = "";
      taskDate.value="";
    };
  
    window.toggleComplete = index => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
     //edit
    window.editTask = index => {
      const task = tasks[index];
      taskTitle.value = task.title;
      taskDesc.value = task.description;
      taskDate.value=task.date;
      tasks.splice(index, 1); 
      renderTasks();
    };
  
    window.deleteTask = index => {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    };
  
    darkModeToggle.addEventListener("change", () => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle("dark-mode", isDarkMode);
      saveDarkMode();
    });
  
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks(btn.dataset.filter);
      });
    });
  
    document.body.classList.toggle("dark-mode", isDarkMode);
    renderTasks();
    addTaskBtn.addEventListener("click", addTask);
  });
  
