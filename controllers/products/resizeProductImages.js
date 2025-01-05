const sharp = require("sharp");
const { catchAsync } = require("../../utils/catchAsync");

exports.resizeProductImages = catchAsync(async (req, res, next) => {
	if (!req.files.productImage || !req.files.manufactureImage) return next();

	req.file.filename = `id`;

	await sharp(req.files.productImage[0].buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`public/src/products/${req.file.filename}`);

	await sharp(req.files.manufactureImage[0].buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`public/src/manufacturers/${req.file.filename}`);

	console.log(req.files);
	next();
});
