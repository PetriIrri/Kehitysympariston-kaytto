var fs = require('fs');

fs.appendFile('mynewfile1.txt', ' Tässä on tekstiä.', function (err) {
if (err) throw err;
console.log('Päivitetty!');
});