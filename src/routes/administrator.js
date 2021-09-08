const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const AdministratorController = require("../controllers/AdministratorController");
const controller = new AdministratorController();

router.get("/", controller.getInfo);

module.exports = router;