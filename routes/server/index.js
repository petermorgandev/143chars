const express = require("express"),
  router = express.Router(),
  deleteRoutes = require("./delete"),
  logIn = require("./login"),
  newRoutes = require("./new"),
  profile = require("./profile"),
  register = require("./register"),
  settingsRoutes = require("./settings"),
  Message = require("../../models/messages");

router.get("/", (req, res, next) => {
  if (!req.session.userId) {
    return res.render("index", { title: "Welcome" });
  }
  Message.find()
    .sort({ date: -1 })
    .populate("user", "-password")
    .exec(function(error, messages) {
      if (error) {
        return next(error);
      } else {
        return res.render("home", { title: "Home", messages: messages });
      }
    });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

router.use("/delete", deleteRoutes);
router.use("/login", logIn);
router.use("/new", newRoutes);
router.use("/profile", profile);
router.use("/register", register);
router.use("/settings", settingsRoutes);

module.exports = router;
