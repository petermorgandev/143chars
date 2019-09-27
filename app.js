const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const logger = require("morgan");
const cors = require("cors");
const { currentUser } = require("./middleware")
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/143chars";
const SESSION_SECRET = process.env.SESSION_SECRET;

app.locals.moment = require("moment");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: db })
  })
);

app.set("view engine", "pug");
app.use(logger("dev"));
app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(currentUser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", require("./routes/server"));
app.use("/api", require("./routes/api"));

app.use((req, res, next) => {
  let err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const params = {
    title: "Error",
    message: err.message,
    error: {}
  };
  res.status(err.status || 500);
  res.render("error", params);
});

app.listen(port, () => {
  console.log("The application is running on http://localhost:3000");
});
