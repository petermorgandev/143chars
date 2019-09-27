const express = require("express");
const router = express.Router();
const { loggedOut, checkRegister } = require("../../middleware");
const { getRegisterView, postRegister } = require('../../controllers/server/register');

router.route("/")
  .get(loggedOut, getRegisterView)
  .post(checkRegister, postRegister);

module.exports = router;
