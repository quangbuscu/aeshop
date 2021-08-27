const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const LoginController = require("../controllers/LoginController");
const controller = new LoginController();

router.get("/", (req, res) => controller.login(req, res));

router.get("/login", (req, res) => controller.login(req, res));

router.post("/login", (req, res) => controller.loginFinal(req, res));


module.exports = router;