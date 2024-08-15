class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    addTask(task) {
        if (localStorage.getItem('tasks') === null) {
            let tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}

class UI {
    getTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let tasksView = document.querySelector("#tasks");
        tasksView.innerHTML = '';
    
        for(let i = 0; i < tasks.length; i++) {
            tasksView.innerHTML += ` 
                <div class="card mb-3">
                    <div class="card-body">
                        <p>${tasks[i].title} - ${tasks[i].description}</p>
                        <a class="btn btn-danger" name="delete" onclick="deleteTaskLocal('${tasks[i].title}')">Delete</a>
                    </div>
                </div>
            `;
        }
    }
}

function saveTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const ui = new UI();
    (!tasks ? console.log('None Tasks') : ui.getTasks())
}

function deleteTaskLocal(title) {
    const ui = new UI();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].title === title) 
            tasks.splice(i, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    ui.getTasks();
}

saveTasks();

document.querySelector('#formTask').addEventListener('submit', e => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const task = new Task(title, description);

    if(title === '' || description === '' || task === '') {
        console.log('Rellena todos los campos');
        return;
    }
    task.addTask(task);
    const ui = new UI();
    ui.getTasks();
    e.reset();
    e.preventDefault();
});


