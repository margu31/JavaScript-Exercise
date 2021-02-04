/******/ (() => { // webpackBootstrap
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// import ajax from './xhr.js';
// import ajax from './promise.js'; 
// const axios = require('axios');
// import axios from './axios.js';
// import axios from 'axios';
// console.log(ajax);
// axios.get('/todos');
// State
var todos = [];
var navState = 'all'; // DOMs

var $todos = document.querySelector('.todos');
var $inputTodo = document.querySelector('.input-todo');
var $completeAll = document.querySelector('.complete-all > .checkbox');
var $completedTodos = document.querySelector('.completed-todos');
var $activeTodos = document.querySelector('.active-todos');
var $clearCompleted = document.querySelector('.clear-completed > .btn');
var $nav = document.querySelector('.nav');

var render = function render() {
  var html = '';

  var _todos = todos.filter(function (_ref) {
    var completed = _ref.completed;
    return navState === 'completed' ? completed : navState === 'active' ? !completed : true;
  });

  _todos.forEach(function (_ref2) {
    var id = _ref2.id,
        content = _ref2.content,
        completed = _ref2.completed;
    html += "<li id=\"".concat(id, "\" class=\"todo-item\">\n        <input id=\"ck-").concat(id, "\" class=\"checkbox\" type=\"checkbox\" ").concat(completed ? 'checked' : '', ">\n        <label for=\"ck-").concat(id, "\">").concat(content, "</label>\n        <i class=\"remove-todo far fa-times-circle\"></i>\n      </li>");
  });

  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter(function (_ref3) {
    var completed = _ref3.completed;
    return completed;
  }).length;
  $activeTodos.textContent = todos.filter(function (_ref4) {
    var completed = _ref4.completed;
    return !completed;
  }).length;
};

var setTodos = function setTodos(_todos) {
  todos = _todos;
  render();
};

var getTodos = function getTodos() {
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
  axios.get('/todos').then(function (response) {
    return response.data;
  }).then(setTodos) // 선택적으로 호출(fulfilled 상태일 때)
  ["catch"](console.error); // 선택적으로 호출됨(상태가 rejected로 바뀐다면)
};

var generateId = function generateId() {
  return todos.length ? Math.max.apply(Math, _toConsumableArray(todos.map(function (todo) {
    return todo.id;
  }))) + 1 : 1;
};

var addTodo = function addTodo(content) {
  // todos = [{ id: generateId(), content, completed: false }, ...todos];
  // console.log('[addTodo]', todos);
  // render();
  // ajax.post('/todos', {id: generateId(), content, completed: false}, setTodos);
  // ajax.post('/todos', {id: generateId(), content, completed: false})
  //   .then(setTodos)
  //   .catch(console.error);
  axios.post('/todos', {
    id: generateId(),
    content: content,
    completed: false
  }).then(function (response) {
    return response.data;
  }).then(setTodos)["catch"](console.error);
};

var toggleTodo = function toggleTodo(id) {
  // todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  // console.log('[toggleTodo]', todos);
  // render();
  var completed = !todos.find(function (todo) {
    return todo.id === +id;
  }).completed; // ajax.patch(`/todos/${id}`, { completed }, setTodos);
  // ajax.patch(`/todos/${id}`, { completed })
  //   .then(setTodos)
  //   .catch(console.error);

  axios.patch("/todos/".concat(id), {
    completed: completed
  }) // .then(console.log)
  .then(function (response) {
    return response.data;
  }) // .then(console.log)
  .then(setTodos)["catch"](console.error);
};

var removeTodo = function removeTodo(id) {
  // todos = todos.filter(todo => todo.id !== +id);
  // console.log('[removeTodo]', todos);
  // render();
  // ajax.delete(`/todos/${id}`, setTodos);
  // ajax.delete(`/todos/${id}`)
  //   .then(setTodos)
  //   .catch(console.error);
  axios["delete"]("/todos/".concat(id)).then(function (response) {
    return response.data;
  }).then(setTodos)["catch"](console.error);
};

var toggleCompleteAll = function toggleCompleteAll(completed) {
  // todos = todos.map(todo => ({ ...todo, completed }));
  // console.log('[toggleCompleteAll]', todos);
  // render();
  // ajax.patch('/todos', { completed }, setTodos);
  // ajax.patch('/todos', { completed })
  //   .then(setTodos)
  //   .catch(console.error);
  axios.patch('/todos', {
    completed: completed
  }).then(function (response) {
    return response.data;
  }).then(setTodos)["catch"](console.error);
};

var removeCompleted = function removeCompleted() {
  // todos = todos.filter(todo => !todo.completed);
  // console.log('[removeCompleted]', todos);
  // render();
  // ajax.delete('/todos/completed')
  //   .then(setTodos)
  //   .catch(console.error);
  axios["delete"]('/todos/completed').then(function (response) {
    return response.data;
  }).then(setTodos)["catch"](console.error);
};

var changeNavState = function changeNavState(id) {
  _toConsumableArray($nav.children).forEach(function ($navItem) {
    $navItem.classList.toggle('active', $navItem.id === id);
  });

  navState = id;
  console.log('[changeNavState]', navState);
  render();
}; // Event bindings


window.onload = getTodos;

$inputTodo.onkeyup = function (_ref5) {
  var keyCode = _ref5.keyCode,
      target = _ref5.target;
  var content = target.value.trim();
  if (keyCode !== 13 || content === '') return;
  addTodo(content);
  target.value = '';
};

$todos.onchange = function (e) {
  toggleTodo(e.target.parentNode.id);
};

$todos.onclick = function (e) {
  if (!e.target.matches('.todos > li > .remove-todo')) return;
  removeTodo(e.target.parentNode.id);
};

$completeAll.onchange = function (e) {
  toggleCompleteAll(e.target.checked);
};

$clearCompleted.onclick = removeCompleted;

$nav.onclick = function (_ref6) {
  var target = _ref6.target;
  if (target === $nav) return; // if (!target.matches('.nav > li:not(.active)')) return;

  changeNavState(target.id);
};

axios.get('http://localhost:7000/todos') // .then(console.log)
.then(function (response) {
  return console.log(response.data);
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map