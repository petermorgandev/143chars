const express = require("express");
const router = express.Router();
const Message = require("../../models/messages");
const { requiresLogin } = require("../../middleware");

router.get("/", requiresLogin, (req, res) => res.render("new", { title: "New Message" }));

router.post("/", requiresLogin, (req, res, next) => {
  const messageData = {
    userId: req.session.userId,
    message: req.body.messageInput,
    user: req.session.userId
  };

  Message.create(messageData, function(error, user) {
    if (error) {
      return next(error);
    }
    return res.redirect("/profile");
  });
});

module.exports = router;
