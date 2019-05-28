const express = require("express");
const router = express.Router([{ mergeParams: true }]);
const User = require("../../models/user");
const Message = require("../../models/messages");
const { requiresLogin, isCurrentUser } = require("../../middleware");

router.get("/message/:messageId", requiresLogin, async (req, res, next) => {
  const getUserId = await Message.findById({ _id: req.params.messageId });

  if (!req.session.userId || getUserId.user != req.session.userId) {
    const err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }

  await Message.deleteOne({ _id: { $in: req.params.messageId } })
    .exec()
    .then(() => res.redirect("/profile"))
    .catch(error => next(error));
});

router.get(
  "/messages/:userId",
  requiresLogin,
  isCurrentUser,
  (req, res, next) => {
    Message.deleteMany({ user: { $in: req.params.userId } })
      .exec()
      .then(() => res.redirect("/profile"))
      .catch(error => next(error));
  }
);

router.get(
  "/user/:userId",
  requiresLogin,
  isCurrentUser,
  async (req, res, next) => {
    await Message.deleteMany({ user: { $in: req.session.userId } });

    await User.deleteOne({ _id: req.session.userId })
      .exec()
      .then(() => res.redirect("/logout"))
      .catch(error => next(error));
  }
);

module.exports = router;
