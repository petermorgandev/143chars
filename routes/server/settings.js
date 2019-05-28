const express = require("express"),
  router = express.Router(),
  User = require("../../models/user"),
  { requiresLogin } = require("../../middleware");

router.get("/", requiresLogin, (req, res, next) => {
  User.find({ _id: { $in: req.session.userId } })
    .exec()
    .then(user =>
      res.render("settings", {
        title: "User Settings",
        username: user[0].username,
        userId: req.session.userId
      })
    )
    .catch(error => next(error));
});

router.post("/", requiresLogin, (req, res, next) => {
  const condition = { _id: req.session.userId };
  const fieldsToUpdate = {
    $set: { avatar: req.body.avatarInput, username: req.body.usernameInput }
  };
  User.findOneAndUpdate(condition, fieldsToUpdate)
    .exec()
    .then(() => res.redirect("/"))
    .catch(error => next(error));
});

module.exports = router;
