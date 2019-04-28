function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  } else {
    return next();
  }
};

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged into view this page.');
    err.status = 401;
    return next();
  }
};

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;