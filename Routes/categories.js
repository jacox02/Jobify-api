const express = require("express");
const app = express();
const connection = require("../Database/database");

const { formatData } = require("../assets/dateFormated");

app.get("/categories/list", (req, res) => {
  connection.query("Select * from categories", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/categories/add", (req, res) => {
  const { categoryName } = req.body;
  const newCategory = {
    Category_Name: categoryName,
    createdAt: formatData(),
    updatedAt: formatData(),
  };
  connection.query("INSERT INTO categories set ?", [newCategory]);
});

module.exports = app;
