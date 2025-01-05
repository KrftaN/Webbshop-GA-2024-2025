const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/products/createProduct");
const { protect } = require("../controllers/authentication/protect");
const { permission } = require("../controllers/authentication/permission");

router.post("/", protect, permission("admin"), createProduct);

module.exports = router;
