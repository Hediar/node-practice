const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_BASIC_DATABASE,
    password: process.env.DB_PASSWORD
});

module.exports = pool.promise();