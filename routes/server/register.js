const express = require("express");
const router = express.Router();
const { loggedOut } = require("../../middleware");
const controllers = require('../../controllers/server/register');

router.get("/", loggedOut, controllers.getRegisterView);
router.post("/", controllers.postRegister);

module.exports = router;
