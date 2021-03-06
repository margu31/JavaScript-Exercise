// No.6 특정 요소의 프로퍼티 값 반전

// todos에서 대상 요소의 id를 인수로 전달하면 해당 요소의 completed 프로퍼티 값을 반전하는 함수를 작성하라.
// 기존 객체의 특정 프로퍼티를 변경/추가하여 새로운 객체를 생성하려면 Object.assign 또는 스프레드 문법을 사용

let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedById(id) {
  // todos = todos.map(item => id === item.id ? !item.completed : item.completed);
  // 이렇게 하면 [false, false, false] 만 반환..
  todos = todos.map(item => item.id === id ? {...item, completed: !item.completed} : item);
  // return todos;
  // 오홍.. 이건 return 안 적어줘도 되는구낭
};

toggleCompletedById(2);

console.log(todos);
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/

// 강사님 답안
/*
function toggleCompletedById(id) {
  todos = todos.map((todo) =>
    todo.id !== id ? todo : { ...todo, completed: !todo.completed}
    );
}
*/

