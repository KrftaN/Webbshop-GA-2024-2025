import { showAlert } from "./alerts.js";
export const addToCart = async (productId, quantity) => {
	try {
		quantity = 1;

		await axios({
			method: "POST",
			url: `http://localhost:3000/api/v1/cart`,
			data: { productId, quantity },
			debug: false,
		});

		showAlert("success", `Lade till ${quantity} vara i kundvagnen`);
	} catch (error) {
		showAlert("error", error.message);
	}
};
