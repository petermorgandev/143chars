const express = require("express"),
  router = express.Router([{ mergeParams: true }]),
  User = require("../../models/user"),
  Message = require("../../models/messages"),
  middle = require("../../middleware");

router.get("/", middle.requiresLogin, (req, res, next) => {
  return res.redirect("/profile/" + req.session.userId);
});

router.get("/:userId", middle.requiresLogin, async function(req, res, next) {
  const user = await User.findOne({ _id: { $in: req.params.userId } });

  await Message.find({ user: { $in: req.params.userId } })
    .sort({ date: -1 })
    .populate("user", "avatar username")
    .exec(function(error, messages, username) {
      if (error) {
        return next(error);
      } else {
        let userData = {
          title: user.username + "'s Profile",
          messages: messages,
          username: user.username,
          profileId: req.params.userId,
          userId: req.session.userId
        };
        return res.render("profile", userData);
      }
    });
});

module.exports = router;
