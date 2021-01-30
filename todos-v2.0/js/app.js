
let todos = [];

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');

const getTodos = () => {
  // 서버에서 데이터 취득
  
  todos = [
    {id: 1, content: 'HTML', completed: true},
    {id: 2, content: 'CSS', completed: true},
    {id: 3, content: 'JavaScript', completed: false},
  ];
};
getTodos();

const render = () => {
  todos.sort((a, b) => b.id - a.id);

  let html = '';

  todos.forEach(({ id, content, completed }) => {
    html += `<li id=${id} class="todo-item">
    <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
    <label for="ck-${id}">${content}</label>
    <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });
  $todos.innerHTML = html;

};

const generateId = () => (todos.length ? Math.max(...todos.map(v => v.id)) + 1 : 1);

document.addEventListener('DOMContentLoaded', render);
// console.dir($inputTodo);

$inputTodo.onkeyup = e => {
  if (e.code !== 'Enter' || $inputTodo.value === '') return;
  // console.dir(e);
  todos = [...todos, { id: generateId(), content: `${$inputTodo.value}`, completed: false }];
  // console.log(todos);
  // console.log($inputTodo.value);
  render();
};

$todos.onclick = e => {
  if (!e.target.matches('i')) return;
  todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);
  // console.log(typeof e.target.parentNode.id);
  // console.log(+e.target.parentNode.id);
  render();
};

// $todos.onclick = e => {
//   if (!e.target.matches('.checkbox')) return;
//   // console.dir(e.target);
//   todos = todos.map(todo => (todo.id === +e.target.parentNode.id ? {...todo, completed: e.target.checked} : todo));
//   // console.log(todos);
//   render();
// };


$todos.onchange = e => {
  todos = todos.map(todo => (todo.id === +e.target.parentNode.id ? {...todo, completed: e.target.checked} : todo));
  // console.log(todos);
  render();
};


