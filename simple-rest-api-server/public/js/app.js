import ajax from './xhr.js'; 
// console.log(ajax);

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
    navState === 'completed' ? completed : navState === 'active' ? !completed : true
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
  ajax.get('/todos', setTodos);
};

const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

const addTodo = content => {
  // todos = [{ id: generateId(), content, completed: false }, ...todos];
  // console.log('[addTodo]', todos);

  // render();
  
  ajax.post('/todos', {id: generateId(), content, completed: false}, setTodos);
};

const toggleTodo = id => {
  // todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  // console.log('[toggleTodo]', todos);

  // render();
  const completed = !todos.find(todo => todo.id === +id).completed
  ajax.patch(`/todos/${id}`, { completed }, setTodos);
};

const removeTodo = id => {
  // todos = todos.filter(todo => todo.id !== +id);
  // console.log('[removeTodo]', todos);

  // render();

  ajax.delete(`/todos/${id}`, setTodos);
};

const toggleCompleteAll = completed => {
  // todos = todos.map(todo => ({ ...todo, completed }));
  // console.log('[toggleCompleteAll]', todos);

  // render();

  ajax.patch('/todos', { completed }, setTodos);
};

const removeCompleted = () => {
  // todos = todos.filter(todo => !todo.completed);
  // console.log('[removeCompleted]', todos);

  // render();

  ajax.delete('/todos/completed', setTodos);
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
