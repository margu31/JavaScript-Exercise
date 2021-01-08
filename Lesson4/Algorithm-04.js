/*
문자열 내 p와 y의 개수
numPY함수는 대문자와 소문자가 섞여있는 문자열 s를 인수로 전달받는다. 
s에 존재하는 ‘p’의 개수와 ‘y’의 갯수를 비교해 같으면 true, 다르면 false를 리턴하도록 함수를 완성하라. 
대소문자를 구별하지 않으며 ‘p’, ‘y’ 모두 하나도 없는 경우는 항상 true를 리턴한다.

예를 들어 s가 ‘pPoooyY’면 true를 리턴하고 ‘Pyy’라면 false를 리턴한다.
*/

function numPY(s) {
  const strP = /p/ig.test(s) ? s.match(/p/ig) : 0;
  const strY = /y/ig.test(s) ? s.match(/y/ig) : 0;

  // console.log(strP);
  // console.log(strY);

  if (strP.length === strY.length || (!strP && !strY)) return true;
  return false;

}

// p 또는 y 한 종류만 들어있을 경우 TypeError 발생 (length프로퍼티)
// function numPY(s) {
  
//   if (!s) return true;

//   const strP = s.match(/p/ig);
//   const strY = s.match(/y/ig);

//   if (!(strP || strY)) return true;
//   else return strP.length === strY.length ? true : false;
// }

console.log(numPY('pPoooyY')); // true
console.log(numPY('Pyy'));     // false
console.log(numPY('ab'));      // true
console.log(numPY(''));        // true
console.log(numPY());          // true
console.log(numPY('pdlske'));  // false
