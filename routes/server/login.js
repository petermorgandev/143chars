const express = require("express");
const router = express.Router();
const { loggedOut, checkLogin } = require("../../middleware");
const controllers = require('../../controllers/server/login');

router.route("/")
  .get(loggedOut, controllers.getLoginView)
  .post(checkLogin, controllers.postLogin);

module.exports = router;
