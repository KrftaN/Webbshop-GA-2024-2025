const { catchAsync } = require("../../utils/catchAsync");
const Product = require("../../models/productModel");
/* const AppError = require("../../utils/appError");
const { formatManufacturerName } = require("../../utils/formatManufacturerName");
const { downloadImage } = require("../../utils/downloadImage"); */

exports.addProduct = catchAsync(async (req, res, next) => {
	const { id, amount } = req.body;

	console.log(req.body);

	const product = await Product.findById({ id });

	res.status(201).json({
		status: "success",
		product,
	});
});
