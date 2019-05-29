const User = require("../../models/user");

const getLoginView = (req, res) => res.render("login", { title: "Log In" });

const postLogin = (req, res, next) => {
  if (req.body.usernameInput && req.body.passwordInput) {
    User.authenticate(req.body.usernameInput, req.body.passwordInput, function(error, user) {
      if (error || !user) {
        const err = new Error("Wrong username or password.");
        err.status = 401;
        return next(err);
      }
      req.session.userId = user._id;
      return res.redirect("/");
    });
  } else {
    const err = new Error("Username and password are required to log in.");
    err.status = 401;
    return next(err);
  }
};

module.exports.getLoginView = getLoginView;
module.exports.postLogin = postLogin;