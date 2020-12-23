let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let formEl = document.querySelector("#task-form");

let createTaskHandler = function(event) {
    event.preventDefault();
    
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector(".select-dropdown").value;
    
    // create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    console.log(taskInfoEl);

    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list 
    tasksToDoEl.appendChild(listItemEl);

    console.dir(listItemEl);

}

formEl.addEventListener("submit", createTaskHandler);