const User = require("../../models/user");

const getSettingsView = (req, res, next) => {
  User.find({ _id: { $in: req.session.userId } })
    .exec()
    .then((user) => {
      const locals = {
        title: "User Settings",
        username: user[0].username,
        userId: req.session.userId
      };
      return res.render("settings", locals)})
    .catch(error => next(error));
};

const postSettings = (req, res, next) => {
  const condition = { _id: req.session.userId };
  const fieldsToUpdate = { $set: { avatar: req.body.avatarInput, username: req.body.usernameInput } };
  User.findOneAndUpdate(condition, fieldsToUpdate)
    .exec()
    .then(() => res.redirect("/"))
    .catch(error => next(error));
};

module.exports.getSettingsView = getSettingsView;
module.exports.postSettings = postSettings;