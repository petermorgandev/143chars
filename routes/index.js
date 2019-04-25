const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {title: 'Welcome'});  
  // if logged in, go to home.pug ---- res.render('home'); 
});

router.get('/error', (req, res) => {
  res.render('error', {title: 'Error'});  
});

router.get('/register', (req, res) => {
  res.render('register', {title: 'Register'});  
});

router.post('/register', (req, res) => {
  res.render('register');  
});

router.get('/login', (req, res) => {
  res.render('login', {title: 'Log In'});  
});

router.post('/login', (req, res) => {
  res.render('login');  
});

router.get('/profile', (req, res) => {
  res.render('profile', {title: 'Your Profile'});  
});

router.get('/new', (req, res) => {
  res.render('new', {title: 'New Message'});  
});

router.post('/new', (req, res) => {
  res.render('new');  
});

router.get('/logout', (req, res) => {
  res.redirect('/');  
});

module.exports = router;