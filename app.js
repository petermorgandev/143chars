const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const moment = require('moment');
const app = express();

app.locals.moment = require('moment');

mongoose.connect('mongodb://localhost:27017/143chars', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(session({
  secret: 'this is a super secret phrase',
  resave: true,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: db })
}));

app.use(function (req, res, next){
  res.locals.currentUser = req.session.userId;
  next();
});

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/index');
app.use(routes);

app.use(express.static('public'));

app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
})

app.listen(3000, () => {
  console.log('The application is running on http://localhost:3000');
});