const User = require("../models/user");

function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect("/");
  }
  return next();
}

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  const err = new Error("You must be logged into view this page.");
  err.status = 401;
  return next(err);
}

function isCurrentUser(req, res, next) {
  const condition = req.session && req.session.userId && req.session.userId === req.params.userId;
  if (condition) {
    return next();
  }
  const err = new Error("You are not authorized to view this page.");
  err.status = 403;
  return next(err);
}

function checkLogin (req, res, next) {
  const condition = req.body.usernameInput && req.body.passwordInput;
  if (condition) {
    return next();
  }
  const err = new Error("Username and password are required to log in.");
  err.status = 401;
  return next(err);
}

function checkRegister (req, res, next) {
  const condition = req.body.usernameInput && req.body.passwordInput && req.body.avatarInput;
  if (condition){
    return next();
  }
  const err = new Error("All fields are required to register.");
  err.status = 400;
  return next(err);
}

const currentUser = async (req, res, next) => {
  if (req.session && req.session.userId){
    const user = await User.findOne({ _id: { $in: req.session.userId } });
    res.locals.currentUser = user.username;
    return next();
  }
  next();
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.isCurrentUser = isCurrentUser;
module.exports.checkRegister = checkRegister;
module.exports.checkLogin = checkLogin;
module.exports.currentUser = currentUser;
