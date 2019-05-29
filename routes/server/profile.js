const express = require("express");
const router = express.Router([{ mergeParams: true }]);
const controllers = require('../../controllers/server/profile');
const { requiresLogin } = require("../../middleware");

router.get("/", requiresLogin, controllers.getProfileView);

router.get("/:userId", requiresLogin, controllers.getProfileById);

module.exports = router;
