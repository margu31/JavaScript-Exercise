/*
두 정수 사이의 합
adder 함수는 정수 x, y를 인수로 전달받는다. 두 수와 두 수 사이에 있는 모든 정수를 더해서 리턴하도록 함수를 완성하라.

x와 y가 같은 경우는 둘 중 아무 수나 리턴한다. x, y는 음수나 0, 양수일 수 있으며 둘의 대소 관계도 정해져 있지 않다.

예를 들어 x가 3, y가 5이면 12를 리턴한다.
*/

function adder(x, y) {
  let sum = 0;

  if (x > y) [x, y] = [y, x];

  for (let i = x; i < y + 1; i++) {
    sum += i;
  }
  
  return sum;
}

console.log(adder(3, 5)); // 12
console.log(adder(5, 5)); // 5
console.log(adder(7, 0)); // 28
console.log(adder(3, -2)); // 3
