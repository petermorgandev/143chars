const express = require("express");
const router = express.Router();
const deleteRoutes = require("./delete");
const logIn = require("./login");
const newRoutes = require("./new");
const profile = require("./profile");
const register = require("./register");
const settingsRoutes = require("./settings");
const { homepage, logOut} = require('../../controllers/server/index');


router.get("/", homepage);
router.use("/delete", deleteRoutes);
router.use("/login", logIn);
router.get("/logout", logOut);
router.use("/new", newRoutes);
router.use("/profile", profile);
router.use("/register", register);
router.use("/settings", settingsRoutes);

module.exports = router;
