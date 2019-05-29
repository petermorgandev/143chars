const express = require("express");
const router = express.Router();
const { loggedOut } = require("../../middleware");
const controllers = require('../../controllers/server/register');

router.route("/")
  .get(loggedOut, controllers.getRegisterView)
  .post(controllers.postRegister);

module.exports = router;
