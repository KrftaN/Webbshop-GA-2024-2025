const { catchAsync } = require("../utils/catchAsync");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const crypto = require("crypto");

exports.getIndex = (req, res) => {
	res.status(200).render("index", {
		pageStyles: "index-style",
		title: "Klasskassan",
	});
};

exports.getLogin = (req, res) => {
	res.status(200).render("login", {
		pageStyles: "login-style",
		title: "Logga in",
	});
};

exports.getSignup = (req, res) => {
	res.status(200).render("signup", {
		pageStyles: "login-style",
		title: "Registrera dig",
	});
};

exports.getForgot = (req, res) => {
	res.status(200).render("forgot", {
		pageStyles: "login-style",
		title: "Glömt lösendord",
	});
};

exports.getShop = catchAsync(async (req, res) => {
	const products = await Product.find();
	res.status(200).render("shop", {
		pageStyles: "shop",
		title: "Shop",
		products,
		noStandard: false,
	});
});

exports.getProductPage = catchAsync(async (req, res) => {
	const id = req.params.id;
	let product = await Product.findById(id);

	res.status(200).render("productPage", {
		pageStyles: "product-style",
		title: `${product.name}`,
		product,
		noStandard: false,
	});
});

const getError = (exports.getError = async (req, res, message, statusCode) => {
	res.status(statusCode).render("error", {
		title: `${statusCode} - ${message}`,
		message,
		statusCode,
		pageStyles: "error-style",
		noStandard: true,
	});
});

exports.getAboutUs = (req, res) => {
	res.status(200).render("aboutUs", {
		pageStyles: "about-us-style",
		title: "Om oss",
	});
};

exports.getShoppingCart = catchAsync(async (req, res) => {
	const userId = req.user.id;
	const userCart = await Cart.findOne({ userId });
	const cart = userCart.products;

	res.status(200).render("shoppingCart", {
		pageStyles: "shopping-cart-style",
		title: "Kundvagn",
		cart,
	});
});

exports.getResetPassword = catchAsync(async (req, res) => {
	const token = req.params.token;

	const hashedToken = crypto.createHash("sha256").update(token).digest("hex"); //Detta skapar en lätt krypterad token som kan användas för att återställa lösenord

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) return getError(req, res, "Sidan kunde inte hittas", 404);

	res.status(200).render("resetPassword", {
		pageStyles: "new-password",
		token,
		title: `Återställ lösenord`,
	});
});

exports.getNewProduct = (req, res) => {
	res.status(200).render("newProduct", {
		pageStyles: "ny-produkt-style",
		title: "Ny produkt",
	});
};

exports.confirmEmail = catchAsync(async (req, res) => {
	const token = req.params.token;

	const emailConfirmationToken = crypto.createHash("sha256").update(token).digest("hex");

	const user = await User.findOne({
		emailConfirmationToken,
		emailConfimationExpires: { $gt: Date.now() },
	})
		.select("+emailConfirmed")
		.includeNonConfirmed();

	if (!user) return getError(req, res, "Sidan kunde inte hittas", 404);

	res.status(200).render("confirmEmail", {
		pageStyles: "confirm-email",
		title: "Bekräfta email",
		token,
	});
});

exports.redirectIfLoggedIn = (req, res, next) => {
	if (res.locals.user) {
		return res.redirect("/");
	} else {
		next();
	}
};
