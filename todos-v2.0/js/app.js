
let todos = [];

const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');


// 렌더링 (todos에 변경이 있을 때 마다)
const render = () => {
  $todos.innerHTML = todos.map(({ id, content, completed }) => 
    `<li id="${id}" class="todo-item">
      <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`).join('');
  
};

// 서버에서 데이터 취득
const fetchTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'JavaScript', completed: false }
  ];
  render();
};

const generateId = id => {
  todos = 
}

document.addEventListener('DOMContentLoaded', fetchTodos());

$inputTodo.onkeyup = e => {
  const content = 
}
