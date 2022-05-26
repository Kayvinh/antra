const baseUrl = 'https://jsonplaceholder.typicode.com'
const path = 'todos'

const getTodos = async () => {
    const response = await fetch(`${baseUrl}/${path}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

const createTmp = (arr) => {
    let tmp = "";
    arr.forEach((item) => {
        tmp += `
        <li>
            <div class="todo-item">
                <span class="todo-content">${item.title}</span>
            </div>
          </li>
        `
    });
    return tmp;
}

const render = (ele, tmp) => {
    ele.innerHTML = tmp;
};

const printTodos = async () => {
    const data = await getTodos();
    const todoItems = document.querySelector('.todo-items');
    const template = createTmp(data);
    render(todoItems, template)
}

printTodos();