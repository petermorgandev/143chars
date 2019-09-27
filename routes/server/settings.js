const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../../middleware");
const { getSettingsView, postSettings } = require('../../controllers/server/settings');

router.route("/")
  .get(requiresLogin, getSettingsView)
  .post(requiresLogin, postSettings);

module.exports = router;
