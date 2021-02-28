const express = require("express");
const app = express();
const pool = require("../Database/database");

app.get("/config", (req, res) => {
  pool.query(`select * from configs where id = 1`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/config/edit", (req, res) => {
  console.log(typeof parseInt(req.body.Work_Quantity));

  const parsedConfig = parseInt(req.body.Work_Quantity);
  const parsedCategoryConfig = parseInt(req.body.Selected_Category);
  pool
    .query(
      `UPDATE configs
    SET Selected_Category = ${parsedCategoryConfig}, 
    Work_Quantity = ${parsedConfig}
    WHERE id = 1;`
    )
    .then((results) => {
      res.send({ message: results });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
});

module.exports = app;
