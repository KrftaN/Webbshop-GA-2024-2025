const express = require("express");
const router = express.Router();
const {
	getIndex,
	getLogin,
	getSignup,
	getForgot,
	getShop,
	getProductPage,
	getResetPassword,
	confirmEmail,
	redirectIfLoggedIn,
	getAboutUs,
	getShoppingCart,
} = require("../controllers/viewsController");
const { protect } = require("../controllers/authentication/protect");
const { permission } = require("../controllers/authentication/permission");
const { isLoggedIn } = require("../controllers/authentication/isLoggedIn");

router.use(isLoggedIn);

router.get("/", getIndex);
router.get("/logga-in", redirectIfLoggedIn, getLogin);
router.get("/registrera", redirectIfLoggedIn, getSignup);
router.get("/glomt-losenord", redirectIfLoggedIn, getForgot);
router.get("/shop", getShop);
router.get("/produkter/:id", getProductPage);
router.get("/aterstall-losenord/:token", getResetPassword);
router.get("/bekrafta-email/:token", confirmEmail);
router.get("/om-oss", getAboutUs);
router.get("/kundvagn", getShoppingCart);

module.exports = router;
