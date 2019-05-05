const express = require('express');
const router = express.Router();
var User = require('../models/user');
var Message = require('../models/messages');
var middle = require('../middleware');

router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    return res.render('index', { title: 'Welcome' });
  }
  Message.find()
    .sort({ date: -1 })
    .populate('user', '-password')
    .exec(function (error, messages) {
      if (error) {
        return next(error);
      } else {
        return res.render('home', { title: 'Home', messages: messages });
      }
    });
});

router.get('/register', middle.loggedOut, (req, res, next) => {
  return res.render('register', { title: 'Register' });
});

router.post('/register', (req, res, next) => {
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
        req.session.userId = user._id;
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

  return res.redirect('/profile/' + req.session.userId);
});

router.get('/profile/:userId', middle.requiresLogin, async function (req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  const user = await User.findOne({ _id: { $in: req.params.userId } });

  await Message.find({ user: { $in: req.params.userId } })
    .sort({ date: -1 })
    .populate('user', 'avatar username')
    .exec(function (error, messages, username) {
      if (error) {
        return next(error);
      } else {
        return res.render('profile', { title: user.username + '\'s Profile', messages: messages, username: user.username, profileId: req.params.userId, userId: req.session.userId});
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
  var messageData = {
    userId: req.session.userId,
    message: req.body.messageInput,
    user: req.session.userId,
  };

  Message.create(messageData, function (error, user) {
    if (error) {
      return next(error);
    } else {
      return res.redirect('/profile');
    }
  });
});

router.get('/settings', middle.requiresLogin, (req, res, next) => {

  User.find({ _id: { $in: req.session.userId } })
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render('settings', { title: 'User Settings', username: user[0].username, userId: req.session.userId });
      }
    });

});

router.post('/settings', function (req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  User.findOneAndUpdate({ _id: req.session.userId }, { $set: { avatar: req.body.avatarInput, username: req.body.usernameInput } }, function (error, doc) {
    return res.redirect('/');
  });

});

router.get('/delete/message/:messageId', middle.requiresLogin, async function (req, res, next) {
  
  const userId = await Message.findById({_id: req.params.messageId});

  if (!req.session.userId || userId.user != req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  await Message.deleteOne({ _id: { $in: req.params.messageId } })
    .exec(function (error) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/profile');
      }
    });
});

router.get('/delete/messages/:userId', middle.requiresLogin,  function (req, res, next) {
  if (!req.session.userId || req.session.userId != req.params.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  Message.deleteMany({ user: { $in: req.params.userId } })
    .exec(function (error) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/profile');
      }
    });
});

router.get('/delete/user/:userId', middle.requiresLogin, async function (req, res, next) {
  if (!req.session.userId || req.session.userId != req.params.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  await Message.deleteMany({ user: { $in: req.session.userId } });

  await User.deleteOne({ _id: req.session.userId })
    .exec(function (error) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/logout');
      }
    });
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


// API routes

// get api/messages
router.get('/api', function (req, res, next) {
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

// get /profile/:userId
router.get('api/profile/:userId', async function (req, res, next) {

  const user = await User.findOne({ _id: { $in: req.params.userId } });

  await Message.find({ user: { $in: req.params.userId } })
    .sort({ date: -1 })
    .populate('user', 'avatar username')
    .exec(function (error, messages, username) {
      if (error) {
        return next(error);
      } else {
        return res.json(messages);

      }
    });

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


// delete delete/message/:messageId
router.delete('api/delete/message/:messageId', function (req, res, next) {

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

// delete delete/messages/:userId
router.delete('api/delete/messages/:userId', /* middle.requiresLogin, */  function (req, res, next) {
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



module.exports = router;