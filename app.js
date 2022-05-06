const addTastBtn = document.getElementById('add__new__to-do__btn');
const deskTaskInput = document.getElementById('description__task');
const todosContent = document.querySelector('.to-do__list__content');

let todoCounter = document.querySelector('.to-do__nav .to-do__info .todo p span');
let doneCounter = document.querySelector('.to-do__nav .to-do__info .done p span');

// const allTasksBtn = document.querySelector('.btn__all');
// const doneTasksBtn = document.querySelector('.btn__done');
// const todoTasksBtn = document.querySelector('.btn__todo');

let day = new Date().getDate();
countDay = day;
if(countDay < 10) {
    countDay = `0${countDay}`;
} else if(countDay >= 10){
    countDay = countDay;
}

let month = new Date().getMonth() + 1;
countMonth = month;
if(countMonth < 10) {
    countMonth = `0${countMonth}`;
} else if(countMonth >= 10){
    countMonth = countMonth;
}

let year = new Date().getFullYear();
let fullDate = `${countDay}.${countMonth}.${year}`

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="to-do__list__item ${task.completed ? 'checked' : ''}">
            <div class="task">
                <div>
                    <p class="number"></p>
                    <p class="description">
                        ${task.description}
                    </p>
                </div>
                <p class="date">${fullDate}</p>
            </div>
            <div class="checkboxes">
                <div onclick="completeTask(${index})" class="tick">
                    <img src="done.svg" alt="">
                </div>
                <div onclick="deleteTask(${index})" class="criss-cross">
                    <img src="cancel.svg" alt="">
                </div>
            </div>
        </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}

const todoTasks = () => {
    const todoItems = tasks.length && tasks.filter(item => item.completed == false);
    let amountTodoItems = todoItems.length;

    if(amountTodoItems == null) {
        todoCounter.innerHTML = "0";
    } else if (amountTodoItems > 0) {
        todoCounter.innerHTML = amountTodoItems;
    } else {
        todoCounter.innerHTML = "0";
    }
}

const doneTasks = () => {
    const doneItems = tasks.length && tasks.filter(item => item.completed == true);
    let amountDoneItems = doneItems.length;

    if(amountDoneItems == null) {
        doneCounter.innerHTML = "0";
    } else if (amountDoneItems > 0) {
        doneCounter.innerHTML = amountDoneItems;
    } else {
        doneCounter.innerHTML = "0";
    }
}

const fillHtmlItems = () => {
    todosContent.innerHTML = "";
    todoTasks();
    doneTasks();
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosContent.innerHTML += createTemplate(item, index)
        })

        // let activeTasks = tasks.length && tasks.filter(item => item.completed == false);
        // activeTasksArray = activeTasks;

        // todoTasksBtn.addEventListener('click', (activeTasksArray) => {
        //     todosContent.innerHTML = createTemplate(activeTasksArray);
        // })




        todoItemElems = document.querySelectorAll('.to-do__list__item');
    }
}

fillHtmlItems();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }

    updateLocal();
    fillHtmlItems();
}

addTastBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlItems();
    deskTaskInput.value = '';
})


// allTasksBtn.addEventListener('click', () => {

// })

// doneTasksBtn.addEventListener('click', () => {
//     const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
//     const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
//     tasks = [...activeTasks, ...completedTasks];
//     tasks.splice(activeTasks);
// })



// const completedTasks = tasks.length && tasks.filter(item => item.completed == true);


const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlItems();
    },1000)
}

