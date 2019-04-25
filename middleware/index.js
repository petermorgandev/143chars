function loggedOut(req, res, next) {
  if (req.session & req.session.userID) {
    return res.redirect('/');
  }
  return next();
};

function requiresLogin(req, res, next) {
  if (req.session && req.session.userID) {
    return next();
  } else {
    var err = new Error('You must be logged into view this page.');
    err.status = 401;
    return next();
  }
};

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;