const { catchAsync } = require("../../utils/catchAsync");
const Cart = require("../../models/cartModel");
const Product = require("../../models/productModel");

exports.addToCart = catchAsync(async (req, res, next) => {
	const { productId, quantity } = req.body;
	const userId = req.user.id;

	const product = await Product.findById(productId);
	let cart = await Cart.findOne({ userId });
	let i = -1; //så jävla buskig lösning

	if (!cart) {
		cart = await Cart.create({ userId, products: [{ product, quantity }] });
	} else if (
		cart.products.some((productObject) => {
			i++; //otroligt fult men det funkar
			return productId == productObject.product._id;
		})
	) {
		cart.products[i].quantity += quantity;
		await cart.save();
	} else {
		cart.products.push({ product, quantity });
		await cart.save();
	}

	res.status(201).json({
		status: "success",
		cart,
	});
});
