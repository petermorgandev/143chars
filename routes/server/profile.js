const express = require('express'),
  router = express.Router([{ mergeParams: true }]),
  User = require('../../models/user'),
  Message = require('../../models/messages'),
  middle = require('../../middleware');

router.get('/', middle.requiresLogin, (req, res, next) => {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  return res.redirect('/profile/' + req.session.userId);
});

router.get('/:userId', middle.requiresLogin, async function (req, res, next) {
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
        return res.render('profile', { title: user.username + '\'s Profile', messages: messages, username: user.username, profileId: req.params.userId, userId: req.session.userId });
      }
    });
});

module.exports = router;