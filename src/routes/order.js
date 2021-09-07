const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const OrderController = require("../controllers/OrderController");
const controller = new OrderController();

router.get("/", controller.getListOrder);

router.get("/detail", controller.getDetailOrder);

// router.post("/login", controller.loginFinal);


module.exports = router;