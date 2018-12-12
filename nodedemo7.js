var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello sisältönä!', function (err) {
if (err) throw err;
console.log('Tallessa!');
});