const mysql = require("mysql");
const { promisify } = require("util");

const connString = {
  host: "b0sfslo2fk2n7unict7p-mysql.services.clever-cloud.com",
  port: 3306,
  user: "ueu6tybzavoosuu6",
  password: "mIInHAx0SF37MxAhBXus",
  database: "b0sfslo2fk2n7unict7p",
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
