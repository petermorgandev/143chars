const User = require("../../models/user");
const Message = require("../../models/messages");

const getProfileView = (req, res) => {
  User.findOne({ _id: { $in: req.session.userId } })
  .exec()
  .then(user => {
    const username = user.username;
    res.redirect(`/profile/${username}`)
  })
  
};

const getProfileById = async (req, res, next) => {
  const user = await User.findOne({ username: { $in: req.params.username } });

  await Message.find({ user: { $eq: user._id } })
    .sort({ date: -1 })
    .populate("user", "avatar username")
    .exec()
    .then((messages) => {
      const userData = {
        title: `${user.username} s Profile`,
        messages,
        username: user.username,
        profileId: user._id.toString(),
        userId: req.session.userId.toString()
      };
      return res.render("profile", userData);
    })
    .catch(error => next(error));
};

module.exports.getProfileView = getProfileView;
module.exports.getProfileById = getProfileById;