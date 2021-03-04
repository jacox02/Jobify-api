const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const pool = require("../Database/database");
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const session = require("express-session")
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods : ["GET", "POST"],
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  key:"userId",
  secret: "Josea",
  resave: false,
  saveUninitialized:false,
  cookie:{
    expires:60 * 60 * 24,
  },
}))

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

app.get("/login",(req, res)=>{
  if(req.session.user){
    res.send({loggedIn: true, user: req.session.user});
  }else{
    res.send({loggedIn:false});
  }
})

app.post("/login", (req, res)=>{
  const User_Email = req.body.User_Email;
  const User_Password = req.body.User_Password;
  console.log(User_Password)
  pool.query(
    "SELECT * FROM users WHERE User_Email = ?;",
    User_Email,
    (err, ressult)=>{
      if(err){
        res.set({err : err});
      }
      if(ressult.length > 0){
        bcrypt.compare(User_Password, ressult[0].User_Password, (error, response)=>{
          if(response){
            req.session.user = ressult;
            console.log(req.session.user);
            res.send(ressult)
          }else{
            res.send({message:"Wronf username/password combination!",code:500});
          }
        })
      } else{
        res.set({message:"User doesn't exist"})
      }
    }

  )
})

module.exports = app;
