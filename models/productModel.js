const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Ogiltigt namn!"] },
	description: {
		type: String,
		required: [true, "Du måste inkludera en beskrivning till produkten!"],
	},
	manufacturer: {
		type: String,
		required: [true, "Ogiltig producent!"],
	},
	manufacturerLink: {
		type: String,
		required: [true, "Ogiltig länk till producent!"],
	},
	manufacturerImage: {
		type: String,
		required: [false, "Du måste inkludera en bild till producenten"],
	},
	price: {
		type: Number,
		required: [true, "Du måste inkludera ett pris!"],
	},
	requiresFridge: {
		type: Boolean,
		required: [true, "Du måste inkludera om produkten är en kylvara"],
	},
	image: {
		type: String,
		required: [false, "Du måste inkludera en bild till produkten!"],
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
