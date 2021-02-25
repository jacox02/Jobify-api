const express = require("express");

const app = express();
const connection = require("../Database/database");

app.get("/categories/list", (req, res) => {
  connection.query("Select * from categories", (err, results, fields) => {
    if (err) throw err;
    res.send({
      message: "Getting categories",
      code: 200,
      data: results,
    });
  });
});

module.exports = app;
