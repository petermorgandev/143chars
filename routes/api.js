const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  Message = require('../models/messages'),
  middle = require('../middleware');

router.get('/', function (req, res, next) {
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

router.get('/user/:userId', async function (req, res, next) {

  const user = await User.findOne({ _id: { $in: req.params.userId } });

  await Message.find({ user: { $in: req.params.userId } })
    .sort({ date: -1 })
    .populate('user', 'avatar username')
    .exec(function (error, messages) {
      if (error) {
        return next(error);
      } else {
        return res.json(messages);
      }
    });

});

router.get('/user/:userId/settings',/*  middle.requiresLogin, */(req, res, next) => {

  User.find({ _id: { $in: req.params.userId } }, { password: false })
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.json(user);
      }
    });

});

router.put('/user/:userId/settings/update', function (req, res, next) {

  User.findOneAndUpdate({ _id: req.params.userId }, { $set: { avatar: req.body.avatarInput, username: req.body.usernameInput } }, function (error, doc) {
    return res.json('User updated');
  });

});

router.delete('/delete/message/:messageId', function (req, res, next) {

  /* const userId = await Message.findById({_id: req.params.messageId});

  if (!req.session.userId || userId.user != req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  } */

  Message.deleteOne({ _id: { $in: req.params.messageId } })
    .exec(function (error) {
      if (error) {
        return next(error);
      } else {
        return res.json({ message: 'Message delete.' });
      }
    });
});

router.delete('/delete/messages/:userId', /* middle.requiresLogin, */  function (req, res, next) {
  /*  if (!req.session.userId || req.session.userId != req.params.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  } */

  Message.deleteMany({ user: { $in: req.params.userId } })
    .exec(function (error) {
      if (error) {
        return next(error);
      } else {
        return res.json({ message: 'Messages delete.' });
      }
    });
});

router.delete('/delete/user/:userId', /* middle.requiresLogin, */ async function (req, res, next) {
  /* if (!req.session.userId || req.session.userId != req.params.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  } */

  await Message.deleteMany({ user: { $in: req.params.userId } });

  await User.deleteOne({ _id: req.params.userId })
    .exec(function (error) {
      if (error) {
        return next(error);
      } else {
        return res.json('User - and their messages - deleted.');
      }
    });
});

router.post('/new/user', (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput && req.body.avatarInput) {
    var userData = {
      username: req.body.usernameInput,
      password: req.body.passwordInput,
      avatar: req.body.avatarInput
    };

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        //req.session.userId = user._id;
        return res.json('User created');
      }
    });
  } else {
    var err = new Error('All fields are required to register.');
    err.status = 400;
    return next(err);
  }
});

router.post('/new/message', (req, res, next) => {
  var messageData = {
    userId: req.body.userId,
    message: req.body.messageInput,
    user: req.body.userId
  };

  Message.create(messageData, function (error, user) {
    if (error) {
      return next(error);
    } else {
      return res.json('Message created');
    }
  });
});

router.post('/login', (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput) {
    User.authenticate(req.body.usernameInput, req.body.passwordInput, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;;
        return res.json({id: user._id, avatar: user.avatar, username: user.username});
      }
    });
  } else {
    var err = new Error('Username and password are required to log in.');
    err.status = 401;
    return next(err);
  }
});

router.get('/logout', (req, res, next) => {
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

module.exports = router;