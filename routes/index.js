const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');  
  // if logged in, go to home.pug
});

router.get('/error', (req, res) => {
  res.render('error');  
});

router.get('/register', (req, res) => {
  res.render('register');  
});

router.post('/register', (req, res) => {
  res.render('register');  
});

router.get('/login', (req, res) => {
  res.render('login');  
});

router.post('/login', (req, res) => {
  res.render('login');  
});

router.get('/profile', (req, res) => {
  res.render('profile');  
});

router.get('/new', (req, res) => {
  res.render('new');  
});

router.post('/new', (req, res) => {
  res.render('new');  
});

router.get('/logout', (req, res) => {
  res.redirect('/');  
});

module.exports = router;