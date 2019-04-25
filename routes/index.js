const express = require('express');
const router = express.Router();
var User = require('../models/user');
var middle = require('../middleware');

router.get('/', middle.homepage, (req, res, next) => {
  return res.render('index', { title: 'Welcome' });
});

router.get('/register', (req, res, next) => {
  return res.render('register', { title: 'Register' });
});

router.post('/register', middle.loggedOut, (req, res, next) => {
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
  res.render('login');
});

router.get('/profile', middle.requiresLogin, (req, res, next) => {
  return res.render('profile', { title: 'Your Profile' });
});

router.get('/new', middle.requiresLogin, (req, res, next) => {
  return res.render('new', { title: 'New Message' });
});

router.post('/new', (req, res, next) => {
  res.render('new');
});

router.get('/logout', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;