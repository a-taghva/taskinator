let taskIdCounter = 0;

let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let formEl = document.querySelector("#task-form");
let pageContentEl = document.querySelector("#page-content");

let completeEditTask = function(taskName, taskType, taskId) {
    let taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

let taskFormHandler = function(event) {
    event.preventDefault();
    
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector(".select-dropdown").value;

    let isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else { // no data attribute, so create object as normal and pass to creatTaskEl function
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
        };

        createTaskEl(taskDataObj);
    }

    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    
    formEl.reset();

}

let createTaskEl = function(taskDataObj) {
    // create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("draggable", "true");
    
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

let taskButtonhandler = function(event) {
    // get target element from event
    let targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetEl.matches(".delete-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

let editTask = function(taskId) {
    // get task list item element
    let taskSelected = document.querySelector( `.task-item[data-task-id="${taskId}"]` );

    // get content from task name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    let taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
    console.log(formEl);
}

let deleteTask = function(taskId) {
    let taskSelected = document.querySelector( `.task-item[data-task-id="${taskId}"]` );
    taskSelected.remove();
};

let taskStatusChangeHandler = function(event) {
    let taskId = event.target.getAttribute("data-task-id");
    let statusValue = event.target.value.toLowerCase();
    let taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    switch (statusValue) {
        case "to do":
            tasksToDoEl.appendChild(taskSelected);
            break;
        case "in progress":
            tasksInProgressEl.appendChild(taskSelected);
            break;
        case "completed":
            tasksCompletedEl.appendChild(taskSelected);
            break;
    }
}

let dragTaskHandler = function(event) {
    let taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    let getId = event.dataTransfer.getData("text/plain");
}

let dropZoneDragHandler = function(event) {
    let taskListEl = event.target.closest(".task-list");

    if (taskListEl) {
        event.preventDefault();
    }
}

let dropTaskHandler = function(event) {
    let id = event.dataTransfer.getData("text/plain");
    let draggableElement = document.querySelector(`.task-item[data-task-id="${id}"]`);
    let dropZoneEl = event.target.closest(".task-list");
    let statusType = dropZoneEl.id;
    let statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    switch (statusType) {
        case "task-to-do":
            statusSelectEl.selectedIndex = 0;
            break;
        case "tasks-in-progress":
            statusSelectEl.selectedIndex = 1;
            break;
        case "tasks-completed":
            statusSelectEl.selectedIndex = 2;
            break;
    }
    dropZoneEl.appendChild(draggableElement);
}

pageContentEl.addEventListener("click", taskButtonhandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);