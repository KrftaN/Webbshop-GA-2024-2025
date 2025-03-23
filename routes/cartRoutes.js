const express = require("express");
const router = express.Router();

//🥵 🥵 🥵 🥵  jag älskar detta 🥵 🥵 🥵 🥵
const { protect } = require("../controllers/authentication/protect");
const { addToCart } = require("../controllers/cart/addToCart");
const { removeFromCart } = require("../controllers/cart/removeFromCart");
const { getCart } = require("../controllers/cart/getCart");

//Middleware
router.post("/", protect, addToCart);
router.delete("/", protect, removeFromCart);
router.get("/", protect, getCart);

module.exports = router;
