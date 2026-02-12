const dateElement = document.getElementById("current-date");

const today = new Date();

dateElement.textContent = today.toDateString();

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const li = document.createElement("li");
  
  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  // Add click to complete behavior
  span.addEventListener("click", function () {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Add delete functionality
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  taskInput.value = "";
  saveTasks();
});

function saveTasks() {
  const tasks = [];

  document.querySelectorAll("#task-list li").forEach(function (li) {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(function (task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("delete-btn");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    span.addEventListener("click", function () {
      li.classList.toggle("completed");
      saveTasks();
    });

    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });
  });
}

loadTasks();