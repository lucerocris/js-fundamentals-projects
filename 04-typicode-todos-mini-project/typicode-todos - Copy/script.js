const apiURL = 'https://jsonplaceholder.typicode.com/todos';

// FETCHING TODO FROM API

const getTodo = () => {
  fetch(apiURL + '?_limit=10')
    .then((res) => res.json())
    .then((data) => data.forEach((todo) => addToDOM(todo)));
};

// ADDING TODO TO DOM

const addToDOM = (todo) => {
  const div = document.createElement('div');
  div.classList.add('todo');
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute('data-id', todo.id);

  if (todo.completed) {
    div.classList.add('done');
  }

  document.getElementById('todo-list').appendChild(div);
};

// CREATING TODO

const createTodo = (e) => {
  e.preventDefault();
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => addToDOM(data));
};

// UPDATING TODO

const toggleDone = (e) => {
  if (e.target.classList.contains('todo')) {
    e.target.classList.toggle('done');

    updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
  }
};

const updateTodo = (id, completed) => {
  fetch(`${apiURL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// DELETING TODO

const deleteTodo = (e) => {
  if (e.target.classList.contains('todo')) {
    const id = e.target.dataset.id;

    fetch(`${apiURL}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => e.target.remove());
  }
};

// INITIALIZE

const init = () => {
  document.addEventListener('DOMContentLoaded', getTodo);
  document.getElementById('todo-form').addEventListener('submit', createTodo);
  document.getElementById('todo-list').addEventListener('click', toggleDone);
  document.getElementById('todo-list').addEventListener('dblclick', deleteTodo);
};

init();
