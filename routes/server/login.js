const express = require("express");
const router = express.Router();
const middle = require("../../middleware");
const controllers = require('../../controllers/server/login');

router.get("/", middle.loggedOut, controllers.getLoginView);
router.post("/", controllers.postLogin);

module.exports = router;
