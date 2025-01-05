const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getNewProduct } = require("../controllers/viewsController");
const { protect } = require("../controllers/authentication/protect");
const { permission } = require("../controllers/authentication/permission");
const { isLoggedIn } = require("../controllers/authentication/isLoggedIn");
const { uploadProductImages } = require("../controllers/products/uploadProductImages");
const { resizeProductImages } = require("../controllers/products/resizeProductImages");

// Set up multer for handling form data
const upload = multer();

router.use(isLoggedIn, protect, permission("admin"));

// Use multer middleware to parse form data
router.post("/ny-produkt", upload.none(), uploadProductImages, resizeProductImages, getNewProduct);

module.exports = router;
