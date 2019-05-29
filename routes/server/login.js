const express = require("express");
const router = express.Router();
const { loggedOut } = require("../../middleware");
const controllers = require('../../controllers/server/login');

router.route("/")
  .get(loggedOut, controllers.getLoginView)
  .post(controllers.postLogin);

module.exports = router;
