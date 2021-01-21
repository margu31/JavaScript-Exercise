// 평균 구하기

function average(array) {
  return array.reduce((acc, cur, i, {length}) => 
    i === length -1 ? (acc + cur) / length : acc + cur, 0);
}

console.log(average([5, 3, 4])); // 4
console.log(average([2, 10, 9])); // 7
