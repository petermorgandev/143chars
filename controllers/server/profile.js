const User = require("../../models/user");
const Message = require("../../models/messages");

const getProfileView = async (req, res) => {
  try {
    const user = await User.findOne({ _id: { $in: req.session.userId } }).exec();
    return res.redirect(`/profile/${user.username}`);
  } catch (error) {
    return next(error);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: { $in: req.params.username } });
    const messages = await Message.find({ user: { $eq: user._id } })
      .sort({ date: -1 })
      .populate("user", "avatar username")
      .exec();
    const userData = {
      title: `${user.username} s Profile`,
      messages,
      username: user.username,
      profileId: user._id.toString(),
      userId: req.session.userId.toString()
    };
    return res.render("profile", userData);
  } catch (error) {
    const err = new Error("Profile does not exist");
    err.status = 500;
    return next(err);
  }
};

module.exports.getProfileView = getProfileView;
module.exports.getProfileById = getProfileById;