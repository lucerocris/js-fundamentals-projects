const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const getTodo = () => {
  fetch(apiURL + '?_limit=10')
    .then((res) => res.json())
    .then((data) => data.forEach((todo) => addTodoToDOM(todo)));
};

function addTodoToDOM(todo) {
  const div = document.createElement('div');
  div.classList.add('todo');
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute('data-id', todo.id);
  if (todo.completed) {
    div.classList.add('done');
  }

  document.getElementById('todo-list').appendChild(div);
}

function createTodo(e) {
  e.preventDefault();

  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  document.getElementById('todo-form').value = '';

  fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => addTodoToDOM(data));
}

function toggleCompleted(e) {
  if (e.target.classList.contains('todo')) {
    e.target.classList.toggle('done');

    updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
  }
}

function updateTodo(id, completed) {
  fetch(`${apiURL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function deleteTodo(e) {
  if (e.target.classList.contains('todo')) {
    e.target.classList.toggle('done');
    const id = e.target.dataset.id;

    fetch(`${apiURL}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => e.target.remove());
  }
}

function init() {
  document.addEventListener('DOMContentLoaded', getTodo);
  document.getElementById('todo-form').addEventListener('submit', createTodo);
  document
    .getElementById('todo-list')
    .addEventListener('click', toggleCompleted);
  document.getElementById('todo-list').addEventListener('dblclick', deleteTodo);
}

init();
