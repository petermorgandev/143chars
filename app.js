const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      session = require('express-session'),
      mongoStore = require('connect-mongo')(session),
      moment = require('moment'),
      app = express(),
      routes = require('./routes/index');

app.locals.moment = require('moment');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
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