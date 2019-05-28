const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const { loggedOut } = require("../../middleware");

router.get("/", loggedOut, (req, res) => res.render("register", { title: "Register" }));

router.post("/", (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput && req.body.avatarInput) {
    const userData = {
      username: req.body.usernameInput,
      password: req.body.passwordInput,
      avatar: req.body.avatarInput
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      }
      req.session.userId = user._id;
      return res.redirect("/");
    });
  } else {
    const err = new Error("All fields are required to register.");
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
