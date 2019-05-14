const express = require('express'),
userRoutes = express.Router([{mergeParams: true}]),
User = require('../../models/user'),
Message = require('../../models/messages');


userRoutes.get('/:userId', async function (req, res, next) {

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

userRoutes.get('/:userId/settings',/*  middle.requiresLogin, */(req, res, next) => {

  User.find({ _id: { $in: req.params.userId } }, { password: false })
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.json(user);
      }
    });

});

userRoutes.put('/:userId/settings/update', function (req, res, next) {

  User.findOneAndUpdate({ _id: req.params.userId }, { $set: { avatar: req.body.avatarInput, username: req.body.usernameInput } }, function (error, doc) {
    return res.json('User updated');
  });

});

module.exports = userRoutes;