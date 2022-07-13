/**

 let ulToDo = document.querySelector('.to-do')
 let ulDone = document.querySelector('.done')
 let inputTask = document.querySelector('#newTask')
 let addButton = document.querySelector('.add')
 
 let currentTask = 1
 
 let newTask = `
 <li>{taskInput}</li>
`
ulToDo.parentElement.addEventListener("click", (elemt) => {
    console.log("ola");
    console.log(elemt);
})

addButton.addEventListener('click', () => {
    if ( inputTask.value != '' ) {
        addTask()
    }
})

inputTask.addEventListener('keydown', (e) => {
    if ( e.keyCode == 13 && inputTask.value != '' ) {
        addTask()
    }
})

const addTask = () => {
    newTask = `<li id="${ currentTask }" >${ inputTask.value }</li>`
    inputTask.value = ''
    ulToDo.innerHTML += newTask
    currentTask++
}

const removeTask = (element) => {
    ulToDo.removeChild(element)
    ulDone.innerHTML += `<li onclick="undoTask(this)">${element.textContent}</li>`
}

const undoTask = (element) => {
    console.log("clicou na tarefa concluida");
}

*/

const todo = document.getElementById("todo");
const done = document.getElementById("done");
let inputTask = document.querySelector("#newTask");
let addButton = document.querySelector(".add");
const ls = localStorage;

let taskList = [];

addButton.addEventListener("click", () => {
    if (inputTask.value != "") {
        add(inputTask.value);
        inputTask.value = ``;
    }
});

inputTask.addEventListener("keydown", (e) => {
    if (e.keyCode == 13 && inputTask.value != "") {
        add(inputTask.value);
        inputTask.value = ``;
    }
});

const checkLocalStorage = () => {
    if (localStorage.getItem("tasks") !== null) return true;
    else {
        localStorage.setItem("tasks", JSON.stringify([]));
    }
};

const add = async (title) => {
    let oldTasks = JSON.parse(ls.getItem("tasks"));
    let newTask = {
        title,
        id: Date.now(),
        complete: false,
    };
    let newTasks = [...oldTasks, newTask];
    ls.setItem("tasks", JSON.stringify(newTasks));
    taskList = [...taskList, newTask];
    show();
};
const toggle = async (id) => {
    let tasks = JSON.parse(ls.getItem("tasks"));
    let indexTask = tasks.findIndex((elemt) => elemt.id === id);
    let auxTask = tasks[indexTask];
    auxTask.complete = !auxTask.complete;
    tasks[indexTask] = auxTask;
    ls.setItem("tasks", JSON.stringify(tasks));
    taskList[indexTask] = auxTask;
    show();
};

const show = async () => {
    todo.innerHTML = "";
    done.innerHTML = "";
    taskList.forEach((task) => {
        if (!task.complete) {
            todo.innerHTML += `<li onclick="toggle(${task.id})">${task.title} <i id="remove" onclick="remove(${task.id})" class="fas fa-trash-alt"></i></li>`;
        } else {
            done.innerHTML += `<li onclick="toggle(${task.id})">${task.title} <i id="remove" onclick="remove(${task.id})" class="fas fa-trash-alt"></i></li>`;
        }
    });
};

const remove = (id) => {
    let tasks = JSON.parse(ls.getItem("tasks"));
    let newTasks = tasks.filter((task) => task.id !== id);
    ls.setItem("tasks", JSON.stringify(newTasks));
    taskList = newTasks;
    show();
};

window.addEventListener("load", async () => {
    console.log(checkLocalStorage());
    taskList = JSON.parse(ls.getItem("tasks"));
    show();
});
