
var star = '';
for (var i=0; i<5; i++){
  for (var j=4; j >= 0; j--) {
    star += i >= j ? '*' : ' ';
  }
  for (var k = 1; k < 5; k++) {
    star += i >= k ? '*' : ' ';
  }
  star += '\n';
}
console.log(star);