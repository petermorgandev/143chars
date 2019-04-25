const express = require('express');
const router = express.Router();
var User = require('../models/user');
var middle = require('../middleware');

router.get('/', middle.homepage, (req, res, next) => {
  return res.render('index', { title: 'Welcome' });
});

router.get('/register', middle.loggedOut, (req, res, next) => {
  return res.render('register', { title: 'Register' });
});

router.post('/register', (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput) {
    var userData = {
      username: req.body.usernameInput,
      password: req.body.passwordInput
    };

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('All fields are required to register.');
    err.status = 400;
    return next(err);
  }
});

router.get('/login', middle.loggedOut, (req, res, next) => {
  return res.render('login', { title: 'Log In' });
});

router.post('/login', (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput) {
    User.authenticate(req.body.usernameInput, req.body.passwordInput, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('Username and password are required to log in.');
    err.status = 401;
    return next(err);
  }
});

router.get('/profile', middle.requiresLogin, (req, res, next) => {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render('profile', { title: 'Your Profile' /* i think the messages go in here */ });
      }
    });
});

router.get('/new', middle.requiresLogin, (req, res, next) => {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }
  return res.render('new', { title: 'New Message' });
});

router.post('/new', (req, res, next) => {
  res.render('new');
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/');
      }
    });
  }
});

module.exports = router;