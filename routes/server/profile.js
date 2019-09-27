const express = require("express");
const router = express.Router([{ mergeParams: true }]);
const { getProfileView, getProfileById } = require('../../controllers/server/profile');
const { requiresLogin } = require("../../middleware");

router.get("/", requiresLogin, getProfileView);
router.get("/:username", requiresLogin, getProfileById);

module.exports = router;
