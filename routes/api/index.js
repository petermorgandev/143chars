const express = require("express");
const api = express.Router();
const userRoutes = require("./user");
const newRoutes = require("./new");
const deleteRoutes = require("./delete");
const User = require("../../models/user");
const Message = require("../../models/messages");
const middle = require("../../middleware");

api.get("/", function(req, res, next) {
  Message.find()
    .sort({ date: -1 })
    .populate("user", "-password")
    .exec(function(error, messages) {
      if (error) {
        return next(error);
      }
      return res.json(messages);
    });
});

api.post("/login", (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput) {
    User.authenticate(req.body.usernameInput, req.body.passwordInput, function(
      error,
      user
    ) {
      if (error || !user) {
        const err = new Error("Wrong username or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.json({
          id: user._id,
          avatar: user.avatar,
          username: user.username
        });
      }
    });
  } else {
    const err = new Error("Username and password are required to log in.");
    err.status = 401;
    return next(err);
  }
});

api.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      return res.json("User logged out");
    });
  }
});

api.use("/user", userRoutes);
api.use("/new", newRoutes);
api.use("/delete", deleteRoutes);

module.exports = api;
