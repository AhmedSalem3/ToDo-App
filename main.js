let input = document.querySelector(".input");
let addBtn = document.querySelector(".add");
let taskHolder = document.querySelector(".tasks");

// Array that holds all tasks
let holderArr = [];

if (localStorage.getItem("tasks")) {
  holderArr = JSON.parse(localStorage.getItem("tasks"));
}

gettingData();

taskHolder.addEventListener("click", function (e) {
  // if delete btn clicked
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deleteFromLocal(e.target.parentElement.getAttribute("data-id"));
  }
  // if task clicked for completion

  if (e.target.classList.contains("task")) {
    taskCompleted(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

input.addEventListener("keyup", function (e) {
  // if pressed Enter
  if (e.keyCode === 13) {
    addBtn.click();
  }
});

addBtn.addEventListener("click", function () {
  if (input.value != "") {
    createElement(input.value);
    input.value = "";
  }
});

function createElement(taskText) {
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  holderArr.push(task);

  addElement(holderArr);
}

function addElement(holderArr) {
  taskHolder.innerHTML = "";

  holderArr.forEach((task) => {
    // creating task
    let div = document.createElement("div");
    div.className = "task";

    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    // adding delete btn
    let delBtn = document.createElement("ion-icon");
    delBtn.name = "close-outline";
    delBtn.className = "del";
    // appending
    div.appendChild(document.createTextNode(task.text));
    div.appendChild(delBtn);
    taskHolder.prepend(div);
  });

  addToLocal(holderArr);
}

function addToLocal(holderArr) {
  localStorage.setItem("tasks", JSON.stringify(holderArr));
}

function gettingData() {
  let foundTasks = localStorage.getItem("tasks");
  if (foundTasks) {
    addElement(JSON.parse(foundTasks));
  }
}

// functions for deleting and finishing tasks

function deleteFromLocal(id) {
  holderArr = holderArr.filter((task) => {
    return task.id != id;
  });
  addElement(holderArr);
}

function taskCompleted(id) {
  for (let i = 0; i < holderArr.length; i++) {
    if (holderArr[i].id == id) {
      holderArr[i].completed === false
        ? (holderArr[i].completed = true)
        : (holderArr[i].completed = false);
    }
  }
  addElement(holderArr);
}
