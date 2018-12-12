var mysql        = require('mysql'); 

var connection   = mysql.createConnection({ 
  supportBigNumbers: true, 
  bigNumberStrings: true, 
  host     : "magnesium", 
  user     : "16bpetrii", 
  password : "salasana", 
  database : "db16bpetrii" 
}); 

module.exports = connection;