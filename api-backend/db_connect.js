const mysql2 = require('mysql2');

const pool = mysql2.createPool({
  user: 'root',
  host: 'localhost',
  database: 'toulou',
  password: '',
  port: 3306,
});

module.exports = pool;