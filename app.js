const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  mongoStore = require('connect-mongo')(session),
  moment = require('moment'),
  logger = require('morgan'),
  cors = require('cors'),
  app = express(),
  routes = require('./routes/index'),
  port = process.env.PORT || 3000;

app.locals.moment = require('moment');

/*

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
    return res.status(200).json({});
  }
  next();
});


*/

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

app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log('The application is running on http://localhost:3000');
});