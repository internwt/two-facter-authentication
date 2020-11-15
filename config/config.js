const mysql = require("mysql");

  const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "testing",
    port: 3306,
  });


// const connection = mysql.createConnection({
//   host: 'localhost',
//   database: 'subsciety',
//   user: 'root',
//   password: '',
//   port: 3306
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

var dbConfig = {
  mysqlConfig: connection,
};

module.exports = dbConfig;
