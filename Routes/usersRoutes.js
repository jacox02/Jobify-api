const express = require("express");
const db = require("../models");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const cors = require("cors");
const pool = require("../Database/database")
app.use(express.json());



app.post('/register', async (req, res) => {

  const User_Name = req.body.User_Name;
  const User_Email = req.body.User_Email;
  const User_Password = req.body.User_Password;

 
 await pool.query("INSERT INTO users (User_Name, User_Email, User_Password) VALUES (?, ?, ?)",[User_Name, User_Email, User_Password], 
  (err, result) => {
    console.log(err);
  });
});

app.post('/login', async (req, res) =>{
  const User_Email = req.body.User_Email;
  const User_Password = req.body.User_Password;

  await pool.query("SELECT * FROM users WHERE User_Email = ? AND User_Password =?",
  [User_Email, User_Password],
  (err, results)=>{
    if(err){
      res.send({err: err})
    }if(results){
      res.send(results);
    }else{
      res.send({message:"wrong Useremail/password combination!"});
    }
  });

})
module.exports = app;
