document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const input = document.getElementById("new-task");
  const list = document.getElementById("task-list");

  function saveTasks() {
    // collect all task texts into an array
    const tasks = Array.from(list.children).map(li => {
      return li.querySelector("span").textContent;
    });
    // store as JSON string
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(text => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.title = "Remove this task";
    removeBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });
    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.title = "Remove this task";
    removeBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });
    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li);
    input.value = "";
    saveTasks();
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });
});

