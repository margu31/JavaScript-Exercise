/*
배열의 첫 요소와 마지막 요소로 배열 만들기
배열의 첫 요소와 마지막 요소를 나타내는 정수를 인자로 받아 정수의 배열을 반환하는 함수를 완성하라.
예를 들어 인수가 [10, 15]인 경우, [ 10, 11, 12, 13, 14, 15 ]를 반환한다.
*/

function generateRange(from, to) {
  const res = [];
  for (let i = from; i < to + 1; i++) {
    res.push(i);
  }
  return res;
}

console.log(generateRange(10, 15)); // [ 10, 11, 12, 13, 14, 15 ]
console.log(generateRange(5, 12)); // [ 5,  6,  7,  8,  9, 10, 11, 12 ]
