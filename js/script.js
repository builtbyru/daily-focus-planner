const dateElement = document.getElementById("current-date");

const today = new Date();

dateElement.textContent = today.toDateString();

const focusInput = document.getElementById("focus-input");

const reflectionInput = document.getElementById("reflection-input");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Save Main Focus in localStorage
focusInput.addEventListener("input", function () {
  localStorage.setItem("mainFocus", focusInput.value);
});

// Save Reflection in localStorage
reflectionInput.addEventListener("input", function () {
  localStorage.setItem("reflection", reflectionInput.value);
});

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
    updateEmptyState();
  });

  taskInput.value = "";
  saveTasks();
  updateEmptyState();
});

// Add localStorage
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

function updateEmptyState() {
  const emptyState = document.getElementById("empty-state");

  if (taskList.children.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
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
      updateEmptyState();
    });
  });

  updateEmptyState();
}


function checkDailyReset() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("plannerDate");

  if (savedDate !== today) {
    // Reset everything
    localStorage.removeItem("tasks");
    localStorage.removeItem("mainFocus");
    localStorage.removeItem("reflection");

    localStorage.setItem("plannerDate", today);
  }
}

checkDailyReset();

// Load saved focus
const savedFocus = localStorage.getItem("mainFocus");

  if (savedFocus) {
    focusInput.value = savedFocus;
  }

// Load saved reflection
const savedReflection = localStorage.getItem("reflection");

  if (savedReflection) {
    reflectionInput.value = savedReflection;
  }

// Load tasks
loadTasks();
updateEmptyState();