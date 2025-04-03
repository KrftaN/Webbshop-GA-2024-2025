const { catchAsync } = require("../../utils/catchAsync");
const Product = require("../../models/productModel");
/* const AppError = require("../../utils/appError");
const { formatManufacturerName } = require("../../utils/formatManufacturerName");
const { downloadImage } = require("../../utils/downloadImage"); */

exports.createProduct = catchAsync(async (req, res, next) => {
	const { name, description, manufacturer, price, image } = req.body;

	const product = await Product.create({
		name,
		description,
		manufacturer,
		price,
		image,
	});

	res.status(201).json({
		status: "success",
		product,
	});
});
