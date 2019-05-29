const express = require("express");
const router = express.Router();
const deleteRoutes = require("./delete");
const logIn = require("./login");
const newRoutes = require("./new");
const profile = require("./profile");
const register = require("./register");
const settingsRoutes = require("./settings");
const Message = require("../../models/messages");


router.get("/", (req, res, next) => {
  if (!req.session.userId) {
    return res.render("index", { title: "Welcome" });
  }

  const locals = { title: "Home", messages };
  
  Message.find()
    .sort({ date: -1 })
    .populate("user", "-password")
    .exec()
    .then(messages => res.render("home", locals))
    .catch(error => next(error));
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
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
