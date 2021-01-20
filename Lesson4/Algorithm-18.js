/*
피보나치 수
피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이 된다.
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946…

2 이상의 n이 입력되었을 때, n번째 피보나치 수를 반환하는 fibonacci 함수를 작성하라.
예를 들어 n = 3이라면 2를 반환한다.
*/

function fibonacci(n) {
  // const res = Array.from({ length: n + 1});
  
  // const result = res.map((_, i, arr) => i > 1 ? arr[i] = arr[i - 2] + arr[i - 1] : arr[i] = i);
  // return result[n];

  const res = [0, 1];

  for (let i = 0; i < n+1; i++) {
    if (i > 1) {
      res.push(res[i-2] + res[i-1]);
    }
  }
  return res[n];
}

console.log(fibonacci(2)); // 1
console.log(fibonacci(3)); // 2
console.log(fibonacci(4)); // 3
console.log(fibonacci(5)); // 5
console.log(fibonacci(6)); // 8
console.log(fibonacci(9)); // 34
console.log(fibonacci(13)); // 233
console.log(fibonacci(18)); // 2584
console.log(fibonacci(21)); // 10946

