const path = require("path");
const Product = require("../models/productModel");
const { downloadImage } = require("./downloadImage");
const { formatManufacturerName } = require("./formatManufacturerName");
const exists = require("./exists");

exports.validateImages = async () => {
	const products = await Product.find();

	for (const product of products) {
		const formattedManufacturerName = formatManufacturerName(product.manufacturer);
		const productsImagePath = path.join(__dirname, `../public/src/products/${product._id}.jpg`);
		const manufacturerImagePath = path.join(
			__dirname,
			`../public/src/manufacturers/${formattedManufacturerName}.jpg`
		);

		try {
			const productImageFileExists = await exists(productsImagePath);
			if (!productImageFileExists) {
				const productImageFilename = `${product._id.toString()}.jpg`;
				console.log(`Image for product ${product._id} does not exist. Downloading...`);
				await downloadImage(product.image, productImageFilename, "products").then(() => {
					console.log(`Successfully downloaded product image for ${product.name}`);
				});
			}

			const manufacturerImageFileExists = await exists(manufacturerImagePath);
			if (!manufacturerImageFileExists) {
				const productImageFilename = `${formattedManufacturerName}.jpg`;
				console.log(
					`Image for manufacturer ${productImageFilename} does not exist. Downloading...`
				);
				await downloadImage(
					product.manufacturerImage,
					productImageFilename,
					"manufacturers"
				).then(() => {
					console.log(
						`Successfully downloaded manufacturer logo for ${product.manufacturer}`
					);
				});
			}
		} catch (err) {
			console.error("Unexpected error:", err);
		}
	}
};
