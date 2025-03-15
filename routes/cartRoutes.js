const express = require("express");
const router = express.Router();

//🥵 🥵 🥵 🥵  jag älskar detta 🥵 🥵 🥵 🥵
const { addProduct } = require("../controllers/cart/addProduct");
const { removeProduct } = require("../controllers/cart/removeProduct");
const { getCart } = require("../controllers/cart/getCart");

//Middleware
router.post("/", protect, addProduct);
router.patch("/", protect, removeProduct);
router.get("/", protect, getCart);

module.exports = router;
