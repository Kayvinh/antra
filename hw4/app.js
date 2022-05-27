// API URL & Path
const baseUrl = 'https://jsonplaceholder.typicode.com'
const path = 'todos'

// Data
let todos = [];

// Selectors
const deleteBtn = document.querySelector('.btn-remove');
const editBtn = document.querySelector('.btn-edit');
const submit = document.querySelector('#submit');
const content = document.querySelector('.content');
const todoItems = document.querySelector('.todo-items');

// CRUD - CREATE
function addTodoItem () {
    content.addEventListener('keypress', (e) => {
        console.log(e.target.value);
    });

    submit.addEventListener('click', () => {
        fetch(`${baseUrl}/${path}`, {
            method: 'POST',
            body: JSON.stringify({
                title: content.value,
                completed: false,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                todos = [...todos, data].reverse();
                const newTemplate = createTmp(todos);
                render(todoItems, newTemplate);
            });
    });
}

// CRUD - READ
const getTodos = async () => {
    const response = await fetch(`${baseUrl}/${path}`);
    const data = await response.json();
    // console.log(data);
    return data;
};

// CRUD - UPDATE
function editItem() {
    todoItems.addEventListener("click", (e) => {
        console.log(e.target.classList);
        if (e.target.classList.contains("fa-pencil-square-o")) {
            const currentId = +e.target.classList[3]
            const itemInput = document.getElementsByClassName(`todo-content ${currentId}`);
  
            fetch(`${baseUrl}/${path}/${currentId}`, {
                method: 'PUT',
                body: JSON.stringify({
                  id: content.id,
                  title: content.value,
                  completed: false,
                  userId: 1,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                });
        }
    })
}
    

// CRUD - DELETE
function deleteItem() {
    todoItems.addEventListener("click", (e) => {
        // console.log(e.target.classList);
        if (e.target.classList.contains("fa-trash")) {
            const currentId = e.target.classList[3]
            // console.log(currentId)
            // console.log(typeof currentId)   // string
            fetch(`${baseUrl}/${path}/${currentId}`, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data)       // empty object
                    todos = todos.filter((todo) =>
                        todo.id !== +currentId
                    )
                // Render Deleted Item
                const newTemplate = createTmp(todos);
                render(todoItems, newTemplate);
                });
        }
    });
};

// Render Functions
const createTmp = (arr) => {
    let tmp = "";
    arr.forEach((item) => {
        tmp += `
        <li>
            <div class="todo-item">
                <span class="todo-content ${item.id}">${item.title}</span>
                <button class="editBtn"><i class="fa fa-pencil-square-o btn-edit ${item.id}" aria-hidden="true"></i></button>
                <button class="deleteBtn"><i class="fa fa-trash btn-remove ${item.id}"></i></button>
            </div>
          </li>
        `
    });
    return tmp;
};

const render = (ele, tmp) => {
    ele.innerHTML = tmp;
};

// INIT
const generateTodos = async () => {
    const data = await getTodos();
    // Store array of objects into todos
    todos = data.map((todo) => {
        return todo;
    });
    // Initial Rendering
    const template = createTmp(data);
    render(todoItems, template);
    //console.log(todos)
    return todos;
};


// Invoke Functions
generateTodos();
addTodoItem();
deleteItem();
editItem();