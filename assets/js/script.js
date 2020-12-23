let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let formEl = document.querySelector("#task-form");

let taskFormHandler = function(event) {
    event.preventDefault();
    
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector(".select-dropdown").value;

    // package up data as an object
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };

    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    
    createTaskEl(taskDataObj);
    formEl.reset();

}

let createTaskEl = function(taskDataObj) {
    // create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);