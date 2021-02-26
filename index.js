const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./models/index");

const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop database and resync");
});

const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

app.use(require("./Routes/works"));
app.use(require("./Routes/categories"));
app.use(require("./Routes/auth"));
app.use(require("./Routes/usersRoutes"));

require("./routesServer/works.routes")(app);
require("./routesServer/category.routes")(app);
require("./routesServer/companies.routes")(app);

app.get("/", (req, res) => {
  res.send({ message: "YOUR API IS WORKING!", code: 200 });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
