const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../../middleware");
const { getnewView, postNew } = require('../../controllers/server/new');

router.route("/")
  .get(requiresLogin, getnewView)
  .post(requiresLogin, postNew);

module.exports = router;
