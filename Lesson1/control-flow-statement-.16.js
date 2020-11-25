 
 var star = '';
 for (var i=0; i<5; i++) {
   for (var j=0; j<5; j++) {
     star += i <=j ? '*' : ' ';
   }
   for (var k=4; k>0; k--) {
     star += i<k ? '*' : ' ';
   }
   star += '\n';
 }
 console.log (star);