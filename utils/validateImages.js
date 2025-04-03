const path = require("path");
const Product = require("../models/productModel");
const { downloadImage } = require("./downloadImage");
const exists = require("./exists");

exports.validateImages = async () => {
	const products = await Product.find();

	for (const product of products) {
		const productsImagePath = path.join(__dirname, `../public/src/products/${product._id}.jpg`);

		try {
			const productImageFileExists = await exists(productsImagePath);
			if (!productImageFileExists) {
				const productImageFilename = `${product._id.toString()}.jpg`;
				console.log(`Image for product ${product._id} does not exist. Downloading...`);
				await downloadImage(product.image, productImageFilename, "products").then(() => {
					console.log(`Successfully downloaded product image for ${product.name}`);
				});
			}
		} catch (err) {
			console.error("Unexpected error:", err);
		}
	}
};
