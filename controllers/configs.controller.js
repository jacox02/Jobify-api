const db = require("../models");
const configs = db.config;
const Op = db.Sequelize.Op;

const configs = {
    id: req.body.ID,
    Work_Quantity: req.body.Cantjobs
}

exports.findAll = (req, res) => {
    configs.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send({
          message:
            err ||
            "There was an error, try again, if problem keeps happening, please contact support",
        });
      });
  };
exports.update = (req, res) => {
  
    configs.update(req.body, {
      where: { id: ID },
    })
      .then((code) => {
        if (code == 1) {
          res.send({
            message: "Work quantity updated successfuly",
          });
        } else {
          res.send({
            message: `There was an error, try again, if problem keeps happening, please contact support`,
          });
        }
      })
      .catch((err) => {
        res.send({
          message:
            err ||
            "There was an error, try again, if problem keeps happening, please contact support",
        });
      });
  };