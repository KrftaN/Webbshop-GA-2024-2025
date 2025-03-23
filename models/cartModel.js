const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
	products: [
		{
			product: { type: Object, required: true }, // Accepts any object
			quantity: { type: Number, required: true, min: 1 },
		},
	],
	createdAt: { type: Date, default: Date.now, expires: "7d" }, // Auto-delete after 7 days
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
