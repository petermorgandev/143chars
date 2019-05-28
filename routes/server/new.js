const express = require("express"),
  router = express.Router(),
  Message = require("../../models/messages"),
  { requiresLogin } = require("../../middleware");

router.get("/", requiresLogin, (req, res, next) => {
  if (!req.session.userId) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }
  return res.render("new", { title: "New Message" });
});

router.post("/", requiresLogin, (req, res, next) => {
  var messageData = {
    userId: req.session.userId,
    message: req.body.messageInput,
    user: req.session.userId
  };

  Message.create(messageData, function(error, user) {
    if (error) {
      return next(error);
    } else {
      return res.redirect("/profile");
    }
  });
});

module.exports = router;
