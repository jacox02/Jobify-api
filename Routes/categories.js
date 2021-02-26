const express = require("express");
const app = express();
const pool = require("../Database/database");

const formatData = require("../assets/dateFormated");

app.get("/categories/list", async (req, res) => {
  await pool.query("Select * from categories", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/categories/add", async (req, res) => {
  const { categoryName } = req.body;
  const newCategory = {
    Category_Name: categoryName,
    createdAt: formatData,
    updatedAt: formatData,
  };

  await pool
    .query("INSERT INTO categories set ?", [newCategory])
    .then(() => {
      res.send({ code: 200, message: "Categoria anadida correctamente" });
    })
    .catch(console.log());
});

module.exports = app;
