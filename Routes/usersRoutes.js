const express = require("express");
const db = require("../models");
const app = express();
const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

app.get("/", async (req, res) => {
  const users = await Users.getAll();
  res.json(Users);
});


/*Manejador de la rutas register*/

app.post("/register", async (req, res) => {
  console.log(req.body);
  req.body.User_Password = bcrypt.hashSync(req.body.User_Password, 10);
  const result = await Users.insert(req.body);
  res.json(result);
});

/*TOKEN*/
const createToken = (users) => {
  let payload = {
    User_ID: users.User_ID,
  };
  return jwt.enconde(payload, process.env.TOKEN_KEY);
};

/*MANEJO DEL LOGIN*/

app.post("/login", async (req, res) => {
  const user = await Users.getByEmail(req.body.email);
  if (user === undefined) {
    res.json({
      error: "Error, email or password not fount",
    });
  } else {
    const equals = bcrypt.compareSync(req.body.User_Password, User_Password);
    if (!equals) {
      res.json({
        error: "Error, email or password not found",
      });
    } else {
      res.json({
        succesfull: createToken(user),
        done: "Login correct",
      });
    }
  }
});

module.exports = app;
