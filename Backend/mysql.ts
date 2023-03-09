const mysql = require("mysql2");

const con = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: "root",
  password: process.env.SQL_PASSWORD
});

con.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected!");
});
