const User = require("../../models/user");
const Message = require("../../models/messages");

const getProfileView = (req, res) => res.redirect(`/profile/${req.session.userId}`);

const getProfileById = async (req, res, next) => {
  const user = await User.findOne({ _id: { $in: req.params.userId } });

  await Message.find({ user: { $in: req.params.userId } })
    .sort({ date: -1 })
    .populate("user", "avatar username")
    .exec()
    .then((messages) => {
      const userData = {
        title: `${user.username} s Profile`,
        messages,
        username: user.username,
        profileId: req.params.userId,
        userId: req.session.userId
      };
      return res.render("profile", userData);
    })
    .catch(error => next(error));
};

module.exports.getProfileView = getProfileView;
module.exports.getProfileById = getProfileById;