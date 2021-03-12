const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const pool = require("../Database/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "Josea",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/register", async (req, res) => {
  const User_Name = req.body.User_Name;
  const User_Email = req.body.User_Email;
  const User_Password = req.body.User_Password;

  await bcrypt
    .hash(User_Password, 10)
    .then((hash) => {
      pool.query(
        "INSERT INTO users (User_Name, User_Email, User_Password) VALUES (?, ?, ?)",
        [User_Name, User_Email, hash]
      );
    })
    .then((res) => res.send(res))
    .catch((err) => res.send(err));
});

app.post("/login", (req, res) => {
  const User_Email = req.body.User_Email;
  const User_Password = req.body.User_Password;
  console.log(User_Password);
  pool
    .query("SELECT * FROM users WHERE User_Email = ?;", User_Email)
    .then((response) => {
      if (response.length > 0) {
        bcrypt
          .compare(User_Password, response[0].User_Password)
          .then((passwordBool) => {
            if (passwordBool == true) {
              res.send(response);
            } else {
              console.log({ bcrypRESPONSE: response });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.send({ message: "Usuario no registrado" });
      }
    })
    .catch((err) => res.send({ err: err }));
});

module.exports = app;
