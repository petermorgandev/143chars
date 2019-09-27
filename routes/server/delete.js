const express = require("express");
const router = express.Router([{ mergeParams: true }]);
const { requiresLogin, isCurrentUser } = require("../../middleware");
const { deleteSingleMessage, deleteAllMessages, deleteUser } = require('../../controllers/server/delete');

router.get("/message/:messageId", requiresLogin, deleteSingleMessage);
router.get("/messages/:userId", requiresLogin, isCurrentUser, deleteAllMessages);
router.get("/user/:userId", requiresLogin, isCurrentUser, deleteUser);

module.exports = router;
