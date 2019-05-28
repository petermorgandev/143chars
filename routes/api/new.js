const express = require("express");
const  newRoutes = express.Router();
const  User = require("../../models/user");
const  Message = require("../../models/messages");

newRoutes.post("/user", (req, res, next) => {
  if (
    req.body.usernameInput &&
    req.body.passwordInput &&
    req.body.avatarInput
  ) {
    const userData = {
      username: req.body.usernameInput,
      password: req.body.passwordInput,
      avatar: req.body.avatarInput
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      }
      //req.session.userId = user._id;
      return res.json("User created");
    });
  } else {
    const err = new Error("All fields are required to register.");
    err.status = 400;
    return next(err);
  }
});

newRoutes.post("/message", (req, res, next) => {
  const messageData = {
    userId: req.body.userId,
    message: req.body.messageInput,
    user: req.body.userId
  };

  Message.create(messageData, function(error, user) {
    if (error) {
      return next(error);
    }
    return res.json("Message created");
  });
});

module.exports = newRoutes;
