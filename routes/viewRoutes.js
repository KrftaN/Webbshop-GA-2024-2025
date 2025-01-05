const express = require("express");
const router = express.Router();
const {
	getIndex,
	getLogin,
	getSignup,
	getForgot,
	getProducts,
	getProductPage,
	getResetPassword,
	confirmEmail,
	redirectIfLoggedIn,
	getWelcome,
} = require("../controllers/viewsController");
const { protect } = require("../controllers/authentication/protect");
const { permission } = require("../controllers/authentication/permission");
const { isLoggedIn } = require("../controllers/authentication/isLoggedIn");

router.use(isLoggedIn);

router.get("/", getIndex);
router.get("/logga-in", redirectIfLoggedIn, getLogin);
router.get("/registrera-dig", redirectIfLoggedIn, getSignup);
router.get("/glomt-losenord", redirectIfLoggedIn, getForgot);
router.get("/produkter", getProducts);
router.get("/produkter/:id", getProductPage);
router.get("/aterstall-losenord/:token", getResetPassword);
router.get("/bekrafta-email/:token", confirmEmail);
router.get("/valkommen", getWelcome);

module.exports = router;
