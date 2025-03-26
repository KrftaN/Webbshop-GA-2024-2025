const { catchAsync } = require("../../utils/catchAsync");
const Product = require("../../models/productModel");
/* const AppError = require("../../utils/appError");
const { formatManufacturerName } = require("../../utils/formatManufacturerName");
const { downloadImage } = require("../../utils/downloadImage"); */

exports.createProduct = catchAsync(async (req, res, next) => {
	const { name, description, price, image } = req.body;

	console.log(req.body);

	const product = await Product.create({
		name,
		description,
		price,
		image,
	});

	res.status(201).json({
		status: "success",
		product,
	});
});
