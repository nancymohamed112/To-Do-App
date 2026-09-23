const defaultTasks = [
    { taskName: "Gym", taskDesc: "Play cardio", taskStatus: true },
    { taskName: "Cinema", taskDesc: "Watch movie", taskStatus: false },
    { taskName: "Study", taskDesc: "Do math homework", taskStatus: true }
];

let savedTasks = JSON.parse(localStorage.getItem("allTasks"));

let tasks = savedTasks || defaultTasks;

const tableBody = document.querySelector("tbody");
const inputName = document.querySelector("#taskName");
const inputDesc = document.querySelector("#taskDesc");
const btnAdd = document.querySelector("#addTask");

function saveToLocalStorage() {
    localStorage.setItem("allTasks", JSON.stringify(tasks));
}

function displayTasks(dataList) {
    tableBody.innerHTML = ''; 
    
    dataList.forEach((task, index) => {
        const statusLabel = task.taskStatus ? "completed" : "waiting";
        const statusClass = task.taskStatus ? "text-success" : "text-warning";
        
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${task.taskName}</td>
                <td>${task.taskDesc}</td>
                <td class="${statusClass} fw-bold">${statusLabel}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
                    <button class="btn btn-sm btn-warning" onclick="EditStatus(${index})">Edit</button>
                </td>
            </tr>
        `;
    });
}

btnAdd.onclick = function() {
    const name = inputName.value.trim();
    const desc = inputDesc.value.trim();

    if (name !== "" && desc !== "") {
        tasks.push({
            taskName: name,
            taskDesc: desc,
            taskStatus: false 
        });
        
        saveToLocalStorage(); 
        displayTasks(tasks); 
        
        inputName.value = "";
        inputDesc.value = "";
    } else {
        alert("Please fill in all fields!");
    }
};

function deleteTask(index) {
    tasks.splice(index, 1);
    saveToLocalStorage(); 
    displayTasks(tasks);
}

function toggleStatus(index) {
    tasks[index].taskStatus = !tasks[index].taskStatus;
    saveToLocalStorage(); 
    displayTasks(tasks);
}

document.querySelector("#All").onclick = () => displayTasks(tasks);

document.querySelector("#Completed").onclick = () => {
    const completedTasks = tasks.filter(t => t.taskStatus === true);
    displayTasks(completedTasks);
};

document.querySelector("#Waiting").onclick = () => {
    const waitingTasks = tasks.filter(t => t.taskStatus === false);
    displayTasks(waitingTasks);
};

document.querySelector("#Delete").onclick = () => {
    if(confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        localStorage.removeItem("allTasks"); 
        displayTasks(tasks);
    }
};

displayTasks(tasks);