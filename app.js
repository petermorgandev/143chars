const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const app = express();

mongoose.connect('mongodb://localhost:27017/143chars', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(session({
  secret: 'this is a super secret phrase',
  resave: true,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: db })
}));

/* pass user id into the templates */

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/index');
app.use(routes);

app.use(express.static('public'));

// deal with 404 errors and pass along to generic error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Generic error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
})

// Create the server on port 3000
app.listen(3000, () => {
  console.log('The application is running on http://localhost:3000');
});