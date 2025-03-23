const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/products/createProduct");
const { getProducts } = require("../controllers/products/getProducts");
const { protect } = require("../controllers/authentication/protect");
const { permission } = require("../controllers/authentication/permission");

router.post("/", protect, permission("admin"), createProduct);
router.get("/", protect, permission("admin"), getProducts);

module.exports = router;
