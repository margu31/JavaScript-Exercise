// 이진 검색 (binary search)

// 선형 검색은 배열의 모든 요소를 확인해야 하지만 이진 검색은 중간값과 검색 대상 값을 비교하여 검색 범위를 매번 반으로 줄여 나간다.
// 검색 대상 값이 중간값보다 작은 경우 중간값보다 작은 쪽(왼쪽)을 검색 범위로 한정한다.
// 검색 대상 값이 중간값보다 큰 경우 중간값보다 큰 쪽(오른쪽)을 검색 범위로 한정한다.
// 검색 대상 값을 검색할 때까지 이와 같은 처러를 반복한다.

// 이진 검색을 통해 주어진 배열(array)에 주어진 값(target)이 요소로 존재하는지 확인하여 존재하는 경우 해당 인덱스를 반환하고 존재하지 않는 경우 -1을 반환하는 함수를 구현하라. 
// 단, 아래의 빌트인 함수 이외에는 어떤 빌트인 함수도 사용하지 않아야 하며, while 문을 사용하여 구현하여야 한다.
// Math.floor: 전달받은 인수의 소수점 이하를 내림한 정수를 반환한다.

function binarySearch(array, target) {
  var start = 0;
  var end = array.length-1;
  
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if ( target > array[mid]) {
      start = mid + 1;
    }
    if ( target < array[mid]) {
      end = mid - 1;
    }  
    if ( target === array[mid]) {
      return mid;
    } 
  }
  
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(binarySearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 7)); // -1