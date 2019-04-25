const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');  
});

router.get('/error', (req, res) => {
  res.render('error');  
});

router.get('/login', (req, res) => {
  res.render('login');  
});

router.get('/new', (req, res) => {
  res.render('new');  
});

router.get('/profile', (req, res) => {
  res.render('profile');  
});

router.get('/register', (req, res) => {
  res.render('register');  
});

module.exports = router;