const User = require("../../models/user");

const getSettingsView = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: { $in: req.session.userId } }).exec();
    const locals = {
      title: "User Settings",
      username: user.username,
      userId: req.session.userId
    };
    return res.render("settings", locals);
  } catch (error) {
    return next(error);
  }
};

const postSettings = async (req, res, next) => {
  try {
    const condition = { _id: req.session.userId };
    const fieldsToUpdate = { $set: { avatar: req.body.avatarInput, username: req.body.usernameInput } };
    await User.findOneAndUpdate(condition, fieldsToUpdate).exec();
    return res.redirect("/");
  } catch (error) {
    return next(error);
  }
};

module.exports.getSettingsView = getSettingsView;
module.exports.postSettings = postSettings;