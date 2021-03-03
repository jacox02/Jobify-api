const express = require("express");
const app = express();
const pool = require("../Database/database");
const momment = require("moment");

app.get("/works/List", async (res) => {
  await pool.query(
    "select * from categories C, works W where W.Category_ID = C.Category_ID ORDER BY Publish_Date DESC",
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/works/add/", async (req, res) => {
  console.log(req.body.categoryid);
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
      res.send({
        message: "Trabajo anadido correctamente",
        code: 200,
      });
    })
    .catch((err) => {
      res.send({
        title: "Trabajo no publicado",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
        allowEnterKey: true,
        allowEscapeKey: true,
        allowOutsideClick: true,
      });
    });
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

app.get("/Works/:id/List/:maxquantity", async (req, res) => {
  if (req.params.id == "1") {
    await pool.query(
      `select * from categories C, works W where  W.Category_ID = C.Category_ID limit ${req.params.maxquantity}`,
      (err, results) => {
        if (err) throw err;
        res.send(results);
      }
    );
  } else {
    await pool.query(
      `select * from categories C, works W WHERE W.Category_ID = C.Category_ID AND W.Category_ID = ${req.params.id} limit ${req.params.maxquantity}`,
      (err, results) => {
        if (err) throw err;
        res.send(results);
      }
    );
  }
});

app.get("/Works/:searchparam/jobList", async (req, res) => {
  await pool.query(
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

app.get("/Works/:id/Details", async (req, res) => {
  await pool.query(
    `select * from works where Work_ID = ${req.params.id}`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.get("/Works/Categories", async (req, res) => {
  await pool.query("select * from categories ", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/works/:id/edit", async (req, res) => {
  await pool
    .query(
      `UPDATE works 
              SET Work_Title = '${req.body.Work_Title}',
                  Location = '${req.body.Location}',
                  Position = '${req.body.Position}',
                  Email = '${req.body.Email}',
                  Owner_Email = '${req.body.Owner_Email}',
                  Description = '${req.body.Description}',
                  Apply_Method = '${req.body.Apply_Method}',
                  WorkType = '${req.body.WorkType}',
                  Work_Keywords = '${req.body.Work_Keywords}',
                  Category_ID = '${req.body.Category_ID}'
              WHERE Work_ID=${req.params.id}`
    )
    .then((result) => {
      res.send({ message: result });
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

app.post("/works/:id/delete", async (req, res) => {
  await pool
    .query(`delete from works where Work_ID = ${req.params.id}`)
    .then((res) => {
      res.send(res);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/categories/:id/update", async (req, res) => {
  let nameCategories = req.body.Category_Name;
  await pool.query(
    `update categories 
  set Category_Name = '${nameCategories}'
  where Category_ID =${req.params.id}`,

    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.delete("/categories/:id/delete", async (req, res) => {
  await pool.query(
    `delete from categories where Category_ID = ${req.params.id}`,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

module.exports = app;
