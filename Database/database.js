const mysql = require("mysql");
const { promisify } = require("util");

const connString = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DBNAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const pool = mysql.createPool(connString);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error / "DATABASE CONNECTION WAS CLOSED";
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error / "DATABASE HAS TOO MANY CONNECTIONS";
    }
    if (err.code === "ECONNREFUSED") {
      console.error / "DATABASE CONNECTION WAS REFUSED";
    }
  }

  if (connection) connection.release();
  console.log("Base de datos conectada");
});

pool.query = promisify(pool.query);

module.exports = pool;
