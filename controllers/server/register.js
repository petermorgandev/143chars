const User = require("../../models/user");

const getRegisterView = (req, res) => res.render("register", { title: "Register" });

const postRegister = (req, res, next) => {
  const userData = {
    username: req.body.usernameInput,
    password: req.body.passwordInput,
    avatar: req.body.avatarInput
  };

  User.create(userData, function(error, user) {
    if (error) {
      return next(error);
    }
    req.session.userId = user._id;
    return res.redirect("/");
  });
};

module.exports.getRegisterView = getRegisterView;
module.exports.postRegister = postRegister;