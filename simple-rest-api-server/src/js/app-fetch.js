// import ajax from './xhr.js';
// import ajax from './promise.js'; 
// const axios = require('axios');
// import axios from './axios.js';

// import axios from 'axios';

// console.log(ajax);
// axios.get('/todos');

// State
let todos = [];
let navState = 'all';

// DOMs
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('.complete-all > .checkbox');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
const $nav = document.querySelector('.nav');

const render = () => {
  let html = '';

  const _todos = todos.filter(({ completed }) =>
    (navState === 'completed' ? completed : navState === 'active' ? !completed : true)
  );

  _todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
        <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`;
  });

  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter(({ completed }) => completed).length;
  $activeTodos.textContent = todos.filter(({ completed }) => !completed).length;
};

const setTodos = _todos => {
  todos = _todos;
  render();
};

const getTodos = () => {
  // todos = [
  //   { id: 1, content: 'HTML', completed: false },
  //   { id: 2, content: 'CSS', completed: true },
  //   { id: 3, content: 'Javascript', completed: false }
  // ].sort((todo1, todo2) => todo2.id - todo1.id);
  // console.log('[getTodos]', todos);

  // render();
  // ajax.get('/todos', setTodos);
  
  // ajax.get('/todos') // 프로미스 반환, then하나 catch하나는 써주는 것이 좋음(에러처리도 항상 염두해두자)
  //   .then(setTodos)
  //   .catch(console.error);
  
  // axios.get('/todos')
  //   .then(response => response.data)
  //   .then(setTodos) // 선택적으로 호출(fulfilled 상태일 때)
  //   .catch(console.error); // 선택적으로 호출됨(상태가 rejected로 바뀐다면)

  fetch('/todos') 
    // fetch 사용시에 아래 줄을 꼭 넣어줘야함!
    .then(res => res.json()) // json 형식의 문자열을 객체로 만들고 promise에 담아서 리턴
    // .then(_todos => console.log(_todos)); // 앞에 놈이 return한 것이 인수로 넘어옴, promise면 promise의 결과값(result)
    .then(setTodos)
    .catch(console.error); 
  // console.log(fetch('/todos'));
 };

const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

const addTodo = content => {
  // todos = [{ id: generateId(), content, completed: false }, ...todos];
  // console.log('[addTodo]', todos);

  // render();
  
  // ajax.post('/todos', {id: generateId(), content, completed: false}, setTodos);

  // ajax.post('/todos', {id: generateId(), content, completed: false})
  //   .then(setTodos)
  //   .catch(console.error);

  // axios.post('/todos', { id: generateId(), content, completed: false })
  //   .then(response => response.data)
  //   .then(setTodos)
  //   .catch(console.error);

  fetch('/todos', {
    method: 'POST',
    headers: {'content-type': 'application/json'}, // mime 타입.. 규약임.. 왜냐고 묻지마
    body: JSON.stringify({ id: generateId(), content, completed: false })
  }).then(res => res.json())
  .then(setTodos)
  .catch(console.error);
};

const toggleTodo = id => {
  // todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  // console.log('[toggleTodo]', todos);

  // render();
  const completed = !todos.find(todo => todo.id === +id).completed;
  // ajax.patch(`/todos/${id}`, { completed }, setTodos);

  // ajax.patch(`/todos/${id}`, { completed })
  //   .then(setTodos)
  //   .catch(console.error);
  
  // axios.patch(`/todos/${id}`, { completed })
  //   // .then(console.log)
  //   .then(response => response.data)
  //   // .then(console.log)
  //   .then(setTodos)
  //   .catch(console.error);

  fetch(`/todos/${id}`, {
    method: 'PATCH',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({ completed })
  }).then(res => res.json())
  .then(setTodos)
  .catch(console.error);
};

const removeTodo = id => {
  // todos = todos.filter(todo => todo.id !== +id);
  // console.log('[removeTodo]', todos);

  // render();

  // ajax.delete(`/todos/${id}`, setTodos);

  // ajax.delete(`/todos/${id}`)
  //   .then(setTodos)
  //   .catch(console.error);

  // axios.delete(`/todos/${id}`)
  //   .then(response => response.data)
  //   .then(setTodos)
  //   .catch(console.error);

  fetch(`/todos/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
  .then(setTodos)
  .catch(console.error);
};

const toggleCompleteAll = completed => {
  // todos = todos.map(todo => ({ ...todo, completed }));
  // console.log('[toggleCompleteAll]', todos);

  // render();

  // ajax.patch('/todos', { completed }, setTodos);

  // ajax.patch('/todos', { completed })
  //   .then(setTodos)
  //   .catch(console.error);

  // axios.patch('/todos', { completed })
  //   .then(response => response.data)
  //   .then(setTodos)
  //   .catch(console.error);

  fetch('/todos', {
    method: 'PATCH',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({ completed })
  }).then(res => res.json())
  .then(setTodos)
  .catch(console.error);

};

const removeCompleted = () => {
  // todos = todos.filter(todo => !todo.completed);
  // console.log('[removeCompleted]', todos);

  // render();

  // ajax.delete('/todos/completed')
  //   .then(setTodos)
  //   .catch(console.error);
  
  // axios.delete('/todos/completed')
  //   .then(response => response.data)
  //   .then(setTodos)
  //   .catch(console.error);

  fetch('/todos/completed', {
    method: 'DELETE'
  }).then(res => res.json())
  .then(setTodos)
  .catch(console.error);
};

const changeNavState = id => {
  [...$nav.children].forEach($navItem => {
    $navItem.classList.toggle('active', $navItem.id === id);
  });

  navState = id;

  console.log('[changeNavState]', navState);
  render();
};

// Event bindings
window.onload = getTodos;

$inputTodo.onkeyup = ({ keyCode, target }) => {
  const content = target.value.trim();
  if (keyCode !== 13 || content === '') return;
  addTodo(content);
  target.value = '';
};

$todos.onchange = e => {
  toggleTodo(e.target.parentNode.id);
};

$todos.onclick = e => {
  if (!e.target.matches('.todos > li > .remove-todo')) return;
  removeTodo(e.target.parentNode.id);
};

$completeAll.onchange = e => {
  toggleCompleteAll(e.target.checked);
};

$clearCompleted.onclick = removeCompleted;

$nav.onclick = ({ target }) => {
  if (target === $nav) return;
  // if (!target.matches('.nav > li:not(.active)')) return;

  changeNavState(target.id);
};

// axios.get('http://localhost:7000/todos')
//   // .then(console.log)
//   .then(response => console.log(response.data));
