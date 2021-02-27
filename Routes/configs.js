const express = require("express");
const app = express();
const pool = require("../Database/database");

app.get("/WorkQuantity", (req, res) => {
  pool.query(
    `select Work_Quantity from configs where id = 1`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.put("/WorkQuantity/edit", (req, res) => {
  const quantity = req.body;
  const setquantity = {
    Work_Quantity: quantity,
  };
  pool.query(`UPDATE configs SET Work_Quantity = ? WHERE id = 1`, [
    setquantity,
  ]);
});

module.exports = app;
