const Sequelize = require("sequelize");

const connection = {
  host: "database-2.ctfmzkj5ibyv.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  port: 3306,
  database: "jobifyDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(
  connection.database,
  connection.user,
  connection.password,
  {
    host: connection.host,
    dialect: connection.dialect,
    operatorsAliases: false,
    pool: {
      max: connection.pool.max,
      min: connection.pool.min,
      acquire: connection.pool.acquire,
      idle: connection.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.works = require("./works.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.companie = require("./companies.model")(sequelize, Sequelize);
db.categories = require("./category.model")(sequelize, Sequelize);
db.config = require("./config.model")(sequelize, Sequelize);

db.config.removeAttribute("createdAt");
db.config.removeAttribute("updatedAt");

db.works.removeAttribute("createdAt");
db.works.removeAttribute("updatedAt");

db.users.removeAttribute("createdAt");
db.users.removeAttribute("updatedAt");

db.companie.removeAttribute("createdAt");
db.companie.removeAttribute("updatedAt");

db.categories.removeAttribute("updatedAt");
db.categories.removeAttribute("createdAt");

db.categories.hasOne(db.works, {
  foreignKey: "Category_ID",
  onDelete: "cascade",
});

module.exports = db;
