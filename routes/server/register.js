const express = require("express");
const router = express.Router();
const { loggedOut, checkRegister } = require("../../middleware");
const controllers = require('../../controllers/server/register');

router.route("/")
  .get(loggedOut, controllers.getRegisterView)
  .post(checkRegister, controllers.postRegister);

module.exports = router;
