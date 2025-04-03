const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Ogiltigt namn!"] },
	description: {
		type: String,
		required: [true, "Du måste inkludera en beskrivning till produkten!"],
	},
	manufacturer: { type: String, required: [true, "Ogiltigt producent!"] },
	price: {
		type: Number,
		required: [true, "Du måste inkludera ett pris!"],
	},
	image: {
		type: String,
		required: [true, "Du måste inkludera en bild till produkten!"],
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
