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

app.post("/WorkQuantity/edit", (req, res) => {
  const quantity = req.body.quantity;
  pool
    .query(
      `UPDATE configs
    SET
    Work_Quantity = ${quantity}
    WHERE id = 1;`
    )
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = app;
