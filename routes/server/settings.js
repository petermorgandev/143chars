const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../../middleware");
const controllers = require('../../controllers/server/settings');

router.get("/", requiresLogin, controllers.getSettingsView);
router.post("/", requiresLogin, controllers.postSettings);

module.exports = router;
