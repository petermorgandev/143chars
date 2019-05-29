const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../../middleware");
const controllers = require('../../controllers/server/settings');

router.route("/")
  .get(requiresLogin, controllers.getSettingsView)
  .post(requiresLogin, controllers.postSettings);

module.exports = router;
