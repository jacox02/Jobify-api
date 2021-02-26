const DBConfig = require("./config");
const Sequelize = require("sequelize");

const connection = {
  host: "b0sfslo2fk2n7unict7p-mysql.services.clever-cloud.com",
  user: "ueu6tybzavoosuu6",
  password: "mIInHAx0SF37MxAhBXus",
  port: 3306,
  database: "b0sfslo2fk2n7unict7p",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const sequelize = new Sequelize(connection);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.works = require("./works.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.companie = require("./companies.model")(sequelize, Sequelize);
db.categories = require("./category.model")(sequelize, Sequelize);
db.config = require("./config.model")(sequelize, Sequelize);
db.categories.hasOne(db.works, {
  foreignKey: "Category_ID",
});

module.exports = db;
