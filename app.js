const TodoInput = document.querySelector('.todo-input');
const AddTodo = document.querySelector('.btn-submit');
const TodoList = document.querySelector('.todo-list');

runEventListeners();

function runEventListeners() {
    AddTodo.addEventListener('click', addTodo);
    TodoList.addEventListener('click', processTodo);
    document.addEventListener('DOMContentLoaded', getTodos);
}

function addTodo(e) {
    e.preventDefault();
    if (TodoInput.value === '') {
        alert('Write a task first!');
    } else {
        // Checkmark
        const completed = document.createElement('a');
        completed.className = 'todo-completed noSelect';
        completed.innerHTML = '<i class="fas fa-check"></i>';
        // Delete button
        const dlt = document.createElement('a');
        dlt.className = 'delete-item noSelect';
        dlt.innerHTML = '<i class="fas fa-trash"></i>';
        // Todo container
        const todo = document.createElement('div');
        todo.className = 'todo';
        todo.appendChild(document.createTextNode(TodoInput.value));
        // List item   
        const li = document.createElement('li');
        li.className = 'todo-item';
        // Adding items to the listitem
        li.innerHTML += todo.outerHTML + completed.outerHTML + dlt.outerHTML;
        // Adding list item to Ul
        TodoList.appendChild(li);
        setLocalStorage(TodoInput.value);
        TodoInput.value = '';
    }
}

function setLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function processTodo(e) {
    if (e.target.classList.contains('todo-completed')) {
        e.target.previousElementSibling.classList.add("completed");
    } else if (e.target.classList.contains('fa-check')) {
        e.target.parentElement.previousElementSibling.classList.add("completed");
    } else if (e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove();
        removeTodoFromLS(e.target.parentElement);
    } else if (e.target.classList.contains('fa-trash')) {
        e.target.parentElement.parentElement.remove();
        removeTodoFromLS(e.target.parentElement.parentElement);
    }
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(task) {
        // Checkmark
        const completed = document.createElement('a');
        completed.className = 'todo-completed noSelect';
        completed.innerHTML = '<i class="fas fa-check"></i>';
        // Delete button
        const dlt = document.createElement('a');
        dlt.className = 'delete-item noSelect';
        dlt.innerHTML = '<i class="fas fa-trash"></i>';
        // Todo container
        const todo = document.createElement('div');
        todo.className = 'todo';
        todo.appendChild(document.createTextNode(task));
        // List item   
        const li = document.createElement('li');
        li.className = 'todo-item';
        // Adding items to the listitem
        li.innerHTML += todo.outerHTML + completed.outerHTML + dlt.outerHTML;
        // Adding list item to Ul
        TodoList.appendChild(li);
    });

}

function removeTodoFromLS(listItem) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo, index) {
        if (listItem.textContent === todo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}