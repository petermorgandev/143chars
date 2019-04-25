const express = require('express');
const router = express.Router();
/* user schema from models */
/* middleware */

router.get('/', (req, res, next) => {
  return res.render('index', {title: 'Welcome'});  
  // if logged in, go to home.pug ---- res.render('home'); 
});

router.get('/register', (req, res, next) => {
  return res.render('register', {title: 'Register'});  
});

router.post('/register', (req, res, next) => {
  res.render('register');  
});

router.get('/login', (req, res, next) => {
  return res.render('login', {title: 'Log In'});  
});

router.post('/login', (req, res, next) => {
  res.render('login');  
});

router.get('/profile', (req, res, next) => {
  return res.render('profile', {title: 'Your Profile'});  
});

router.get('/new', (req, res, next) => {
  return res.render('new', {title: 'New Message'});  
});

router.post('/new', (req, res, next) => {
  res.render('new');  
});

router.get('/logout', (req, res, next) => {
  res.redirect('/');  
});

module.exports = router;