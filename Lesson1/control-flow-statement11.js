// pattern 1
// *
// **
// ***
// ****
// *****

var line = 5;
var star = '';
for (var i = 1; i <= line; i++) {
  star = star + '*'  // star + '*\n' 이렇게 하면 이상하게 나오는데 개행문자를 어떻게 넣어야 하는거지..?
  console.log(star);
}

