const User = require("../../models/user");
const Message = require("../../models/messages");

const deleteSingleMessage = async (req, res, next) => {
  const getUserId = await Message.findById({ _id: req.params.messageId });
  
  const condition = !req.session.userId || getUserId.user != req.session.userId;
  if (condition) {
    const err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }

  await Message.deleteOne({ _id: { $in: req.params.messageId } })
    .exec()
    .then(() => res.redirect("/profile"))
    .catch(error => next(error));
}

const deleteAllMessages = (req, res, next) => {
  Message.deleteMany({ user: { $in: req.params.userId } })
    .exec()
    .then(() => res.redirect("/profile"))
    .catch(error => next(error));
}

const deleteUser = async (req, res, next) => {
  await Message.deleteMany({ user: { $in: req.session.userId } });

  await User.deleteOne({ _id: req.session.userId })
    .exec()
    .then(() => {
      if (req.session) {
        req.session.destroy(function(err) {
          if (err) {
            return next(err);
          }
          return res.redirect("/");
        });
      }
    })
    .catch(error => next(error));
}

module.exports.deleteSingleMessage = deleteSingleMessage;
module.exports.deleteAllMessages = deleteAllMessages;
module.exports.deleteUser = deleteUser;