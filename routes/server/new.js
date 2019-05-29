const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../../middleware");
const controllers = require('../../controllers/server/new');

router.get("/", requiresLogin, controllers.getnewView);
router.post("/", requiresLogin, controllers.postNew);

module.exports = router;
