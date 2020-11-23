// pattern 3
// *****
// ****
// ***
// **
// *

var star = '';

for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5-i; j++) {
    star = star + '*';
  }
  star = star + '\n';
}
console.log(star);