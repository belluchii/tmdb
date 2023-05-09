const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
let app = express();
const router = require("./routes/user");

////middlewares
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

///rutas
app.use("/user", router);

db.sync({ force: false }).then(() => {
  console.log("db connect");
  app.listen(3001, console.log("listen on port 3001"));
});
