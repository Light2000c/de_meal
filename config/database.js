const mysql = require("mysql");

const pool = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if(err) throw err;

    // console.log(`connection ${connection}`);
});

module.exports = pool;