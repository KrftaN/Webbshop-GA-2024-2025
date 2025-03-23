const { catchAsync } = require("../../utils/catchAsync");
const Cart = require("../../models/cartModel");

exports.getCart = catchAsync(async (req, res, next) => {
	const userId = req.user.id;

	const cart = await Cart.findOne({ userId });

	res.status(200).json({
		status: "success",
		cart,
	});
});
