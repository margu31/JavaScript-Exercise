/*
선택 정렬(selection sort)은 배열의 최소값을 검색하여 배열의 왼쪽부터 순차적으로 정렬을 반복하는 정렬 알고리즘이다.
배열이 미정렬 상태이므로 최소값 검색에는 이진 검색이 아닌 선형 검색 알고리즘을 사용한다.
선택 정렬은 버블 정렬보다 빠르다.
시간 복잡도: O(n2)

선택 정렬을 통해 주어진 배열(array)을 정렬하는 함수를 구현하라. 
단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.
*/

/*
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let temp = 0;
    for (let j = i; j < array.length; j++) { 
      if (array[i] > array[j]) { 
        // 이상하다.. array[i] > array[j]일때 위치가 바뀌어야하는데 그렇게 할땐 결과가 내림차순으로 나옴
        // 0번째 인덱스랑 1번째 인덱스부터 비교 하고 싶어서 j=1로 했는데 또 원하는 결과가 안나옴.. 왜지?
        // 흠.. array[j+1]해도 결과가 안나오고... 뭐람 

        // i=0일때는 > 성립하는데 i=1 부터 엇갈리기 시작.... 그래서 j=i해줘야함 j가 i보다 작아지지 않도록!!!

        // temp = array[i];
        // array[i] = array[j];
        // array[j] = temp; 

        // 디스트럭처링으로 바꿔보기!
        [array[i], array[j]] = [array[j], array[i]];
      } 
    }
  }
  return array;
}
*/

function selectionSort(array) {
  let min = 0;
  for (let i = 0; i < array.length; i++) {
    min = i;
    for (let j = i+1; j < array.length; j++) {
      if (array[min] > array[j]) min = j;
    }
    [array[i], array[min]] = [array[min], array[i]];
  }
  return array;
}

console.log(selectionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(selectionSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(selectionSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]

console.log(selectionSort([5, 0, 99, 1243, 4, 134])); // [ 0, 4, 5, 99, 134, 1243 ]
