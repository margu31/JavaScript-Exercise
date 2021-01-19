/*
직사각형이 되는 나머지 좌표 구하기
임의의 좌표 3개가 주어질 때 직사각형이 되는 나머지 1개의 좌표를 구하라. 
예를 들어, [[1, 4], [3, 4], [3, 10]]가 주어지면 [1, 10]을 구한다.

for 문은 사용하지 않도록 하자.
*/

// 이 코드는 인수가 [[6, 10], [5, 10], [5, 5]]로 주어졌을 때 값이 제대로 나오지 않고 
// [6]만 나오기 때문에 보완이 필요함

// function getRestCoordinate(array) {
//   const flatArr = array.flat();
  
//   const dup = flatArr.filter((v, i, arr) => arr.indexOf(v) !== i);
  
//   let result = flatArr.filter(item => dup[0] !== item && dup[1] !== item);
//   // console.log(result);
//   return flatArr.indexOf(result[0]) % 2 ? result.reverse() : result;
// }

// 음.. 아래 코드를 짧게 만들 수 없으려나..? 

function getRestCoordinate(array) {
  const arr = array.flat();

  const evens = arr.filter((_, i) => i % 2 === 0);
  const odds = arr.filter((_, i) => i % 2);

  const evenDup = evens.filter((v, i, arr) => arr.indexOf(v) !== i); 
  const oddDup = odds.filter((v, i, arr) => arr.indexOf(v) !== i); 

  const result = [];
  result.push(evens.filter(item => item !== evenDup[0]));
  result.push(odds.filter(item => item !== oddDup[0]));

  return result.flat();
}

console.log(getRestCoordinate([[1, 4], [3, 4], [3, 10]])); // [1, 10]
console.log(getRestCoordinate([[7, 3], [9, 3], [9, 0]])); // [7, 0]
console.log(getRestCoordinate([[6, 10], [5, 10], [5, 5]])); // [6, 5]
console.log(getRestCoordinate([[2, 1], [2, 8], [7, 8]])); // [7, 1]

