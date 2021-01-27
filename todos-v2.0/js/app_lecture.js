// Global state
let todos = [];

// DOM nodes
// <ul class="todos">
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.getElementById('ck-complete-all');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
const $completed = document.querySelector('.completed-todos');
const $active = document.querySelector('.active-todos');


const render = () => {
  console.log('[todos]', todos);

  $todos.innerHTML = todos.map(({ id, content, completed }) => 
    `<li id="${id}" class="todo-item">
      <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`).join('');

  $completed.textContent = todos.filter(todo => todo.completed).length;
  $active.textContent = todos.filter(todo => !todo.completed).length;

  // const countCompleted = todos.filter(todo => todo.completed).length;
  // const countActive = todos.filter(todo => !todo.completed).length;
  // console.log(countCompleted, countActive);

};

const fetchTodos () => {
  // TODO: 서버로부터 todos 데이터를 취득 
  todos = [
    // { id: 1, content: 'HTML', completed: false },
    // { id: 2, content: 'CSS', completed: true },
    // { id: 3, content: 'JavaScript', completed: false }
  ];

  // 서버에서 sort해서 주는게 좋음 프론트에서 하지 않고 
  todos = [...todos].sort((todo1, todo2) => todo2.id - todo1.id)
  render();
};

/*
<li id="1" class="todo-item">
  <input id="ck-1" class="checkbox" type="checkbox">
  <label for="ck-1">HTML</label>
  <i class="remove-todo far fa-times-circle"></i>
</li>
*/

const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const addTodo = content => {
  todos = [{ id: generateId(), content, completed: false }, ...todos];
  render();
};

const toggleTodo = id => {
  todos.map(todo => (todo.id === +id ? {...todo, completed: !todo.completed} : todo))
  render();
};

const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== +id);
  render();
};

const toggleCompleted = () => {
  todos = todos.map(todo => ({...todo, completed: $completeAll.checked}));
  render();
};

document.addEventListener('DOMContentLoaded', fetchTodos());

$inputTodo.onkeyup = e => {
  const content = $inputTodo.value;
  // console.log($inputTodo.value);

  if (e.key !== 'Enter' || !content) return;
  addTodo(content);
  
  $inputTodo.value = '';  
};

$todos.onchange = e => {
  const id = e.target.parentNode.id;
  toggleTodo(id);

  // console.log(e.target.parentNode.id);
};
// $todos.addEventListener = ('change', () => {})

$todos.onclick = e => {
  if (!e.target.classList.contains('remove-todo')) return;

  // console.log(e.target.parentNode.id);
  removeTodo(e.target.parentNode.id);
};

$completeAll.onchange = toggleCompleted;
  // console.log($completeAll.checked);

const removeCompletedAll = () => {
  todos = todos.filter(todo =? !todo.completed);
  render();
};

$clearCompleted.onclick = removeCompletedAll;



