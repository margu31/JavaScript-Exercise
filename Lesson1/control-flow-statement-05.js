// 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
// 0
// 2
// 4
// 6
// 8

// for (var i=0; i<10; i++) {
//   if (i%2 === 0) {
//     console.log(i)
//   }
// }

var i = 0;
while (i<10) {
  if (i%2 === 0) {
    console.log(i)
  }
  i++
}