const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  mongoStore = require("connect-mongo")(session),
  moment = require("moment"),
  logger = require("morgan"),
  cors = require("cors"),
  app = express(),
  corsOptions = {
    origin: "http://localhost:8080",
    credentials: true
  },
  dotenv = require("dotenv").config(),
  port = process.env.Port || 3000,
  MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/143chars",
  SESSION_SECRET = process.env.SESSION_SECRET;

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

app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

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
    message: err.message,
    error: {}
  });
});

app.listen(port, () => {
  console.log("The application is running on http://localhost:3000");
});
