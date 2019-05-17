const express = require("express"),
  router = express.Router(),
  User = require("../../models/user"),
  middle = require("../../middleware");

router.get("/", middle.loggedOut, (req, res, next) => {
  return res.render("register", { title: "Register" });
});

router.post("/", (req, res, next) => {
  if (
    req.body.usernameInput &&
    req.body.passwordInput &&
    req.body.avatarInput
  ) {
    var userData = {
      username: req.body.usernameInput,
      password: req.body.passwordInput,
      avatar: req.body.avatarInput
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("/");
      }
    });
  } else {
    var err = new Error("All fields are required to register.");
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
