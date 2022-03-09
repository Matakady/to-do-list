const taskContainer = document.querySelector(".container");
const input = document.querySelector("#task-to-add");
const button = document.querySelector(".button");
const completedTask = document.querySelector("#completed");
const totalTasks = document.querySelector("#total");
let completedTaskNumber = 0;
let totalTaskNumber = localStorage.getItem("tasksNumber") || 0;
let newTaskText = "";
totalTasks.innerHTML = totalTaskNumber;

const changeTaskStatus = (event) => {
  //event.target.classList.toggle("done");
  if (event.target.classList.contains("done")) {
    event.target.classList.remove("done");
    completedTaskNumber--;
    totalTaskNumber--;
    localStorage.setItem("tasksNumber", totalTaskNumber);
  } else {
    event.target.classList.add("done");
    completedTaskNumber++;
    totalTaskNumber++;
    localStorage.setItem("tasksNumber", totalTaskNumber);
  }
  completedTask.innerHTML = completedTaskNumber;
  totalTasks.innerHTML = totalTaskNumber;
};

const removeTask = (event) => {
  event.target.parentElement.parentElement.remove();
};

const createNewTask = () => {
  const task = document.createElement("div");
  task.innerHTML = `<div class="task">  
  <div class="checkbox not-done"></div>
  <p>Úkol</p>
  <i class="bin far fa-trash-alt"></i>
</div>`;
  taskContainer.appendChild(task);
  task.querySelector("p").innerHTML = newTaskText;
  const checkbox = task.querySelector(".checkbox");
  const bin = task.querySelector(".bin");
  checkbox.onclick = (event) => changeTaskStatus(event);
  bin.onclick = (event) => {
    if (confirm("Erase Task?")) {
      removeTask(event);
    }
  };
  input.value = "";
};

button.onclick = () => {
  if (newTaskText !== "") {
    createNewTask();
  } else {
    alert("Text Bar Is Empty!");
  }
};

input.onkeyup = (e) => {
  newTaskText = e.target.value;
  if (e.keyCode === 13) {
    if (newTaskText !== "") {
      createNewTask();
    } else {
      alert("Text Bar Is Empty!");
    }
  }
};
