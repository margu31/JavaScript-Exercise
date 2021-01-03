/*
id 프로퍼티의 값 중에서 최대값 구하기
todos의 id 프로퍼티의 값 중에서 최대값을 구하는 함수를 작성하라.

단, for 문, Array#forEach는 사용하지 않도록 하자.
*/

let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function getMaxId() {
  // 최대값 구하기라서 Math.max를 사용하려고 했는데 어떻게 적용해야할지..ㅜㅜ바보당
  // 다른 친구들꺼를 봐보니 Math.max를 쓰기도 하고 reduce를 쓴 친구도 있었다
  // reduce를 쓰다니 넘나 신기방기 대단하당 
  // 메서드만 떠올리지 말고 어떻게 활용하는지 많은 연습이 필요한듯! 그리고 다양한 방법으로 생각해봐야겠다!
  const max = Math.max(...todos.map(item => item.id));
  return max;
  // return todos.reduce((acc, cur) => acc > cur.id ? acc : cur.id, 0);
};

console.log(getMaxId()); // 3

