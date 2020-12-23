let taskIdCounter = 0;

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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique ID
    taskIdCounter++;
}

let createTaskActions = function(taskId) {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create dropdown
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // create options for dropdowm
    let statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    };

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);