globalThis.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const completedList = document.getElementById("completedList");

  // Timer modal elements
  const timerModal = document.getElementById("timerModal");
  const timerInput = document.getElementById("timerInput");
  const confirmTimer = document.getElementById("confirmTimer");
  const cancelTimer = document.getElementById("cancelTimer");

  // Edit modal elements
  const editModal = document.getElementById("editModal");
  const editInput = document.getElementById("editInput");
  const confirmEdit = document.getElementById("confirmEdit");
  const cancelEdit = document.getElementById("cancelEdit");

  // Variables
  let currentTaskForTimer = null;
  let currentTaskForEdit = null;

  /* ---- Create Task ------ */
  function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (isCompleted) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" class="task-check" ${isCompleted ? "checked" : ""}/>
        <span class="task-text">${taskText}</span>
      </div>
      <div class="task-meta">
        <small class="task-date">Added: ${new Date().toLocaleTimeString()}</small>
        <button class="set-timer"><i class="fa-regular fa-clock"></i></button>
        <div class="timer-circle hidden">
          <svg>
            <circle cx="20" cy="20" r="18"></circle>
            <circle class="progress" cx="20" cy="20" r="18"></circle>
          </svg>
          <span class="timer-text">0s</span>
        </div>
        <button class="edit-task"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-task"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkbox = li.querySelector(".task-check");
    const timerBtn = li.querySelector(".set-timer");
    const timerCircle = li.querySelector(".timer-circle");
    const progressCircle = li.querySelector(".progress");
    const timerText = li.querySelector(".timer-text");
    const editBtn = li.querySelector(".edit-task");
    const deleteBtn = li.querySelector(".delete-task");

    /* --- Checkbox behavior --- */
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) completeTask(li);
      else restoreTask(li);
    });

    /* --- Timer behavior --- */
    timerBtn.addEventListener("click", () => {
      currentTaskForTimer = { li, timerCircle, progressCircle, timerText };
      timerModal.classList.remove("hidden");
    });

    /* --- Edit behavior --- */
    editBtn.addEventListener("click", () => {
      currentTaskForEdit = li;
      editInput.value = li.querySelector(".task-text").textContent;
      editModal.classList.remove("hidden");
    });

    /* --- Delete behavior --- */
    deleteBtn.addEventListener("click", () => li.remove());

    if (isCompleted) completedList.appendChild(li);
    else taskList.appendChild(li);
  }

  /* ---- Add Task ------ */
  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;
    createTaskElement(text);
    taskInput.value = "";
  });

  /* ------ Timer Modal ------- */
  confirmTimer.addEventListener("click", () => {
    const mins = Number.parseInt(timerInput.value);
    if (!mins || Number.isNaN(mins) || !currentTaskForTimer) return;

    const { li, timerCircle, progressCircle, timerText } = currentTaskForTimer;
    const totalTime = mins * 60;
    let timeLeft = totalTime;

    timerModal.classList.add("hidden");
    timerCircle.classList.remove("hidden");

    const circumference = 2 * Math.PI * 18; // r = 18
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = 0;

    const interval = setInterval(() => {
      timeLeft--;
      const offset = circumference - (timeLeft / totalTime) * circumference;
      progressCircle.style.strokeDashoffset = offset;
      timerText.textContent = `${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(interval);
        completeTask(li);
        timerText.textContent = "Done";
      }
    }, 1000);

    timerInput.value = "";
    currentTaskForTimer = null;
  });

  cancelTimer.addEventListener("click", () => {
    timerModal.classList.add("hidden");
    timerInput.value = "";
  });

  /* ---------- Edit Modal ----------- */
  confirmEdit.addEventListener("click", () => {
    if (currentTaskForEdit && editInput.value.trim()) {
      currentTaskForEdit.querySelector(".task-text").textContent = editInput.value.trim();
    }
    editModal.classList.add("hidden");
    editInput.value = "";
    currentTaskForEdit = null;
  });

  cancelEdit.addEventListener("click", () => {
    editModal.classList.add("hidden");
    editInput.value = "";
  });

  /* ----- Move to Completed ------ */
  function completeTask(task) {
    task.classList.add("completed");
    const checkbox = task.querySelector(".task-check");
    checkbox.checked = true;
    setTimeout(() => {
      task.remove();
      completedList.appendChild(task);
    }, 300);
  }

  /* ------- Restore Unchecked Task -------- */
  function restoreTask(task) {
    task.classList.remove("completed");
    const checkbox = task.querySelector(".task-check");
    checkbox.checked = false;
    setTimeout(() => {
      task.remove();
      taskList.appendChild(task);
    }, 300);
  }
});
