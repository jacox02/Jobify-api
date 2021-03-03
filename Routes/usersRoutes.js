const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const pool = require("../Database/database");
app.use(express.json());

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

app.get("/login", async (req, res) => {
  const User_Email = req.body.User_Email;
  const User_Password = req.body.User_Password;

  await bcrypt
  .compareSync(User_Password, 10)
  .then((compareSync)=>{
    pool.query(
      "SELECT * FROM users WHERE User_Email = ? AND User_Password =?",
      [User_Email, User_Password],
      (err, results) => {
        if (err) {
          res.send({ err: err });
        }
        if (results.length > 0) {
          res.send(results);
        } else {
          res.send({ message: "wrong Useremail/password combination!" });
        }
      }
    );
  })
  
});
module.exports = app;
