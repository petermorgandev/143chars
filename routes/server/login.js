const express = require("express"),
  router = express.Router(),
  User = require("../../models/user"),
  middle = require("../../middleware");

router.get("/", middle.loggedOut, (req, res, next) =>
  res.render("login", { title: "Log In" })
);

router.post("/", (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput) {
    User.authenticate(req.body.usernameInput, req.body.passwordInput, function(
      error,
      user
    ) {
      if (error || !user) {
        var err = new Error("Wrong username or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/");
      }
    });
  } else {
    var err = new Error("Username and password are required to log in.");
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
