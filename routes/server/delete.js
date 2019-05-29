const express = require("express");
const router = express.Router([{ mergeParams: true }]);
const { requiresLogin, isCurrentUser } = require("../../middleware");
const controllers = require('../../controllers/server/delete');

router.get("/message/:messageId", requiresLogin, controllers.deleteSingleMessage);

router.get(
  "/messages/:userId",
  requiresLogin,
  isCurrentUser,
  controllers.deleteAllMessages
);

router.get(
  "/user/:userId",
  requiresLogin,
  isCurrentUser,
  controllers.deleteUser
);

module.exports = router;
