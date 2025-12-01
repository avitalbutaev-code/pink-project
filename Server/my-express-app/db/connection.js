const mysql = require("mysql2");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "pink_db",
  multipleStatements: true,
});
con.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
module.exports = con;
