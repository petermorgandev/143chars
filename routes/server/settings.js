const express = require('express'),
  router = express.Router(),
  User = require('../../models/user')
middle = require('../../middleware');


router.get('/', middle.requiresLogin, (req, res, next) => {
  User.find({ _id: { $in: req.session.userId } })
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render('settings', { title: 'User Settings', username: user[0].username, userId: req.session.userId });
      }
    });
});

router.post('/', function (req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  User.findOneAndUpdate({ _id: req.session.userId }, { $set: { avatar: req.body.avatarInput, username: req.body.usernameInput } }, function (error, doc) {
    return res.redirect('/');
  });

});

module.exports = router;