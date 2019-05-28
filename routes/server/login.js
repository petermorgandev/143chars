const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const middle = require("../../middleware");


router.get("/", middle.loggedOut, (req, res) => res.render("login", { title: "Log In" }));

router.post("/", (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput) {
    User.authenticate(req.body.usernameInput, req.body.passwordInput, function(error, user) {
      if (error || !user) {
        const err = new Error("Wrong username or password.");
        err.status = 401;
        return next(err);
      }
      req.session.userId = user._id;
      return res.redirect("/");
    });
  } else {
    const err = new Error("Username and password are required to log in.");
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
