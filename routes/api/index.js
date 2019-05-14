const express = require('express'),
  api = express.Router(),
  userRoutes = require('./user'),
  newRoutes = require('./new'),
  deleteRoutes = require('./delete'),
  User = require('../../models/user'),
  Message = require('../../models/messages'),
  middle = require('../../middleware');

api.get('/', function (req, res, next) {
  Message.find()
    .sort({ date: -1 })
    .populate('user', '-password')
    .exec(function (error, messages) {
      if (error) {
        return next(error);
      } else {
        return res.json(messages);
      }
    });
});

api.post('/login', (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput) {
    User.authenticate(req.body.usernameInput, req.body.passwordInput, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.json({id: user._id, avatar: user.avatar, username: user.username});
      }
    });
  } else {
    var err = new Error('Username and password are required to log in.');
    err.status = 401;
    return next(err);
  }
});

api.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.json('User logged out');
      }
    });
  }
});

api.use('/user', userRoutes);
api.use('/new', newRoutes);
api.use('/delete', deleteRoutes);

module.exports = api;