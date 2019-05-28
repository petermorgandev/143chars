const express = require("express"),
  router = express.Router(),
  User = require("../../models/user"),
  { requiresLogin } = require("../../middleware");

router.get("/", requiresLogin, (req, res, next) => {
  User.find({ _id: { $in: req.session.userId } }).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      return res.render("settings", {
        title: "User Settings",
        username: user[0].username,
        userId: req.session.userId
      });
    }
  });
});

router.post("/", requiresLogin, function(req, res, next) {
  User.findOneAndUpdate(
    { _id: req.session.userId },
    {
      $set: { avatar: req.body.avatarInput, username: req.body.usernameInput }
    },
    function(error, doc) {
      return res.redirect("/");
    }
  );
});

module.exports = router;
