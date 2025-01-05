const { catchAsync } = require("../utils/catchAsync");
const { formatManufacturerName } = require("../utils/formatManufacturerName");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const crypto = require("crypto");

exports.getIndex = (req, res) => {
	res.status(200).render("index", {
		pageStyles: "index-style",
		title: "Klasskassan",
	});
};

exports.getLogin = (req, res) => {
	res.status(200).render("login", {
		pageStyles: "logga-in-style",
		title: "Logga in",
	});
};

exports.getSignup = (req, res) => {
	res.status(200).render("signup", {
		pageStyles: "registrera-dig-style",
		title: "Registrera dig",
	});
};

exports.getForgot = (req, res) => {
	res.status(200).render("forgot", {
		pageStyles: "glömt-lösenord-style",
		title: "Glömt lösendord",
	});
};

exports.getProducts = catchAsync(async (req, res) => {
	const Products = await Product.find();
	res.status(200).render("products", {
		pageStyles: "produkter-style",
		title: "Produkter",
		Products,
	});
});

exports.getProductPage = catchAsync(async (req, res) => {
	const id = req.params.id;
	let product = await Product.findById(id);

	product.formattedName = formatManufacturerName(product.manufacturer); //Lägger till det formaterade productentnamnet för att stödja filformatet;
	product.kylvara = `${product.requiresFridge ? "Ja" : "Nej"}`;

	res.status(200).render("productPage", {
		pageStyles: "produkt-style",
		title: `${product.name}`,
		product,
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

exports.getWelcome = (req, res) => {
	res.status(200).render("welcome", {
		pageStyles: "välkommen-style",
		title: "Klasskassan - Välkommen",
		noStandard: true,
	});
};

exports.getResetPassword = catchAsync(async (req, res) => {
	const token = req.params.token;

	const hashedToken = crypto.createHash("sha256").update(token).digest("hex"); //Detta skapar en lätt krypterad token som kan användas för att återställa lösenord

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) return getError(req, res, "Sidan kunde inte hittas", 404);

	res.status(200).render("resetPassword", {
		pageStyles: "nytt-lösenord-style",
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

	const emailConfirmationToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		emailConfirmationToken,
		emailConfimationExpires: { $gt: Date.now() },
	})
		.select("+emailConfirmed")
		.includeNonConfirmed();

	if (!user) return getError(req, res, "Sidan kunde inte hittas", 404);

	res.status(200).render("confirmEmail", {
		pageStyles: "bekräfta-mail-style",
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
