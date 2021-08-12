let ulToDo = document.querySelector('.to_do')
let ulDone = document.querySelector('.done')
let inputTask = document.querySelector('#newTask')
let addButton = document.querySelector('.add')

let currentTask = 1

let newTask = `
    <li>{taskInput}</li>
`

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
    newTask = `<li onclick="removeTask(this)" id="${ currentTask }" >${ inputTask.value }</li>`
    inputTask.value = ''
    ulToDo.innerHTML += newTask
    currentTask++
}

const removeTask = (element) => {
    ulToDo.removeChild(element)
    ulDone.innerHTML += `<li><strike>${element.textContent}</strike></li>`
}
