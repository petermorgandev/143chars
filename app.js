const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const moment = require("moment");
const logger = require("morgan");
const cors = require("cors");
const { currentUser } = require("./middleware")
const app = express();
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true
};
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/143chars";
const SESSION_SECRET = process.env.SESSION_SECRET;

app.locals.moment = require("moment");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: db })
  })
);

app.use(currentUser);

app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/server"));
app.use("/api", require("./routes/api"));

app.use(express.static("public"));

app.use(function(req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    message: err.message,
    error: {}
  });
});

app.listen(port, () => {
  console.log("The application is running on http://localhost:3000");
});
