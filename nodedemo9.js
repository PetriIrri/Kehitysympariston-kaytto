var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Tässä korvaava teksti', function (err) {
if (err) throw err;
console.log('Korvattu!');
});