// pattern 2
// *****
//  ****
//   ***
//    **
//     *

var star = '';
for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5; j++) {
    star += j < i ? ' ' : '*';
  }
  star += '\n';
}
console.log(star);
