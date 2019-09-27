const express = require("express");
const router = express.Router();
const { loggedOut, checkLogin } = require("../../middleware");
const { getLoginView, postLogin } = require('../../controllers/server/login');

router.route("/")
  .get(loggedOut, getLoginView)
  .post(checkLogin, postLogin);

module.exports = router;
