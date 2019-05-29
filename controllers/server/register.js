const User = require("../../models/user");

const getRegisterView = (req, res) => res.render("register", { title: "Register" });

const postRegister = (req, res, next) => {
  const userData = {
    username: req.body.usernameInput,
    password: req.body.passwordInput,
    avatar: req.body.avatarInput
  };

  User.create(userData)
    .then(user => {
      req.session.userId = user._id;
      return res.redirect("/");
    })
    .catch(error => next(error));
};

module.exports.getRegisterView = getRegisterView;
module.exports.postRegister = postRegister;