const express = require("express"),
  router = express.Router([{ mergeParams: true }]),
  User = require("../../models/user"),
  Message = require("../../models/messages"),
  middle = require("../../middleware");

router.get("/message/:messageId", middle.requiresLogin, async function(
  req,
  res,
  next
) {
  const userId = await Message.findById({ _id: req.params.messageId });

  if (!req.session.userId || userId.user != req.session.userId) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }

  await Message.deleteOne({ _id: { $in: req.params.messageId } }).exec(function(
    error
  ) {
    if (error) {
      return next(error);
    } else {
      return res.redirect("/profile");
    }
  });
});

router.get("/messages/:userId", middle.requiresLogin, function(req, res, next) {
  if (!req.session.userId || req.session.userId != req.params.userId) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }

  Message.deleteMany({ user: { $in: req.params.userId } }).exec(function(
    error
  ) {
    if (error) {
      return next(error);
    } else {
      return res.redirect("/profile");
    }
  });
});

router.get("/user/:userId", middle.requiresLogin, async function(
  req,
  res,
  next
) {
  if (!req.session.userId || req.session.userId != req.params.userId) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }

  await Message.deleteMany({ user: { $in: req.session.userId } });

  await User.deleteOne({ _id: req.session.userId }).exec(function(error) {
    if (error) {
      return next(error);
    } else {
      return res.redirect("/logout");
    }
  });
});

module.exports = router;
