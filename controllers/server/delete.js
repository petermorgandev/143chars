const User = require("../../models/user");
const Message = require("../../models/messages");

const deleteSingleMessage = async (req, res, next) => {
  try {
    const getUserId = await Message.findById({ _id: req.params.messageId });
    const condition = !req.session.userId || getUserId.user != req.session.userId;
    if (condition) {
      const err = new Error("You are not authorized to view this page.");
      err.status = 403;
      return next(err);
    }
    await Message.deleteOne({ _id: { $in: req.params.messageId } }).exec();
    return res.redirect("/profile");
  } catch (error) {
    return next(error);
  }
};

const deleteAllMessages = async (req, res, next) => {
  try {
    await Message.deleteMany({ user: { $in: req.params.userId } }).exec();
    return res.redirect("/profile");
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await Message.deleteMany({ user: { $in: req.session.userId } });
    await User.deleteOne({ _id: req.session.userId }).exec();
    if (req.session) {
      req.session.destroy(err => {
        if (err) return next(err);
      });
    }
    return res.redirect("/");
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteSingleMessage = deleteSingleMessage;
module.exports.deleteAllMessages = deleteAllMessages;
module.exports.deleteUser = deleteUser;