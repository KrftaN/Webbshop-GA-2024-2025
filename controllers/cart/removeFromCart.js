const { catchAsync } = require("../../utils/catchAsync");
const Cart = require("../../models/cartModel");
const Product = require("../../models/productModel");
const AppError = require("../../utils/appError");
const mongoose = require("mongoose");

exports.removeFromCart = catchAsync(async (req, res, next) => {
	const { productId, quantity } = req.body;
	const userId = req.user.id;

	const product = await Product.findById(productId);
	let cart = await Cart.findOne({ userId });
	let i = -1; //så jävla buskig lösning

	if (!cart) return next(new AppError("Du har ingen kundvagn"), 404);
	if (!product) return next(new AppError("Produkten finns inte"), 404);

	cart.products.forEach((productObject) => {
		i++; //otroligt fult men det funkar
		return productId == productObject.product._id;
	});
	const quantitySum = cart.products[i].quantity - quantity;

	if (quantitySum <= 0) {
		cart.products.splice(i, 1);
	} else {
		cart.products[i].quantity = quantitySum;
	}
	await cart.save();

	res.status(204).json({
		status: "success",
	});
});
