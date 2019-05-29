const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../../middleware");
const controllers = require('../../controllers/server/new');

router.route("/")
  .get(requiresLogin, controllers.getnewView)
  .post(requiresLogin, controllers.postNew);

module.exports = router;
