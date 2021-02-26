const express = require("express");
const app = express();
const pool = require("../Database/database");
const momment = require("moment");

app.get("/works/List", async (req, res) => {
  await pool.query(
    "select * from categories C, works W where W.Category_ID = C.Category_ID ORDER BY Publish_Date DESC",
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/works/add/", async (req, res) => {
  const {
    title,
    ownermail,
    keyword,
    joburl,
    worktype,
    worklocation,
    position,
    applyMethodMail,
    applymethod,
    description,
    categoryid,
  } = req.body;

  const newJob = {
    Publish_Date: momment().format("YYYY-MM-DD HH:mm:ss"),
    Work_Title: title,
    Owner_Email: ownermail,
    Work_Keywords: keyword,
    Job_URL: joburl,
    WorkType: worktype,
    Location: worklocation,
    Position: position,
    Email: applyMethodMail,
    Apply_Method: applymethod,
    Owner_Email: ownermail,
    Description: description,
    Category_ID: categoryid,
  };
  await pool
    .query("INSERT INTO works set ?", [newJob])
    .then(() => {
      res.send({ code: 200, message: "Trabajo anadido correctamente" });
    })
    .catch(console.log());
});

app.get("/myWorks/:ownermail/List", async (req, res) => {
  await pool.query(
    `SELECT * FROM works WHERE Owner_Email= '${req.params.ownermail}'`,
    (err, result) => {
      if (err) {
        res.send({
          message: err || "There was an error!",
        });
      } else {
        if (result.length < 1) {
          res.send({
            result: "Not work added yet! Please add One :D",
          });
        } else {
          res.send(result);
        }
      }
    }
  );
});

app.get("/Works/:id/List", (req, res) => {
  if (req.params.id == "1") {
    pool.query(
      `select * from categories C, works W where  W.Category_ID = C.Category_ID`,
      (err, results) => {
        if (err) throw err;
        res.send(results);
      }
    );
  } else {
    pool.query(
      `select * from categories C, works W WHERE W.Category_ID = C.Category_ID AND W.Category_ID = ${req.params.id}`,
      (err, results) => {
        if (err) throw err;
        res.send(results);
      }
    );
  }
});

app.get("/Works/:searchparam/jobList", (req, res) => {
  pool.query(
    `select * from works w
    inner join categories c
    on c.Category_ID  = w.Category_ID
    where w.Location like '%${req.params.searchparam}%'
    or w.Position like '%${req.params.searchparam}%'
    or w.Work_Title like '%${req.params.searchparam}%'`,
    (err, results) => {
      if (err)
        throw (
          err || {
            message:
              "Hubo un error buscando los trabajos, contacte con soporte tecnico",
          }
        );
      res.send(results);
    }
  );
});

app.get("/Works/:id/Details", (req, res) => {
  pool.query(
    `select * from works where Work_ID = ${req.params.id}`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.get("/Works/Categories", (req, res) => {
  pool.query("select * from categories ", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});



app.put("/Update/Works/:id", (req, res) => {

  let email = req.body.Email
  let owner_email = req.body.Owner_Email
  let title = req.body.Work_Title
  let location = req.body.Location
  let position = req.body.Position
  let description = req.body.Description
  let aply_method = req.body.Apply_Method
  let work_type = req.body.WorkType

  pool.query(`update works 
              set Work_Title = '${title}',
                  Location = '${location}',
                  Position = '${position}',
                  Email = '${email}',
                  Owner_Email = '${owner_email}',
                  Description = '${description}',
                  Apply_Method = '${aply_method}',
                  WorkType = '${work_type}'
              
              where Work_ID=${req.params.id}`
              
              , (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


app.delete("/delete/Works/:id", (req,res)=>{
  pool.query(`delete from works where Work_ID = ${req.params.id}`,
  (err,results)=>{
    if(err) throw err
    res.send(results)
  }
  
  )
})


app.put("/Update/Categories/:id", (req, res) => {

  let nameCategories = req.body.Category_Name 
  pool.query(`update categories 
  set Category_Name = '${nameCategories}'
  where Category_ID =${req.params.id}`
              
              , (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


app.delete("/delete/Categories/:id", (req,res)=>{
  pool.query(`delete from categories where Category_ID = ${req.params.id}`,
  (err,results)=>{
    if(err) throw err
    res.send(results)
  }
  
  )
})

module.exports = app;
