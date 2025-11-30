const mysql = require("mysql2");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "pink_db",
});

module.exports = con;
