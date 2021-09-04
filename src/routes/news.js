const express = require("express");
const router = express.Router();

/**
 * Routing for News
 */
const NewsController = require("../controllers/NewsController");
const controller = new NewsController();

router.get("/", (req, res) => controller.getNews(req, res));

// router.get("/login", (req, res) => controller.login(req, res));

// router.post("/login", (req, res) => controller.loginFinal(req, res));


module.exports = router;