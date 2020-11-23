// pattern 4
// *
// **
// ***
// ****
// *****

var star = '';
for (var i = 0; i < 5; i++) {
  for (var j = 4; j >= 0; j--) {
    star += j > i ? ' ' : '*';
  }
  star += '\n';
}
console.log(star);