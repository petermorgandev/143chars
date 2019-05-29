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

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.isCurrentUser = isCurrentUser;
