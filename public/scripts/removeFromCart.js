import { showAlert } from "./alerts.js";
export const removeFromCart = async (productId) => {
	try {
		const quantity = 1000;

		await axios({
			method: "DELETE",
			url: `http://localhost:3000/api/v1/cart`,
			data: { productId, quantity },
			debug: false,
		});

		showAlert("success", "Logged in successfully");
		window.setTimeout(() => {
			location.assign("/");
		}, 1500);
	} catch (error) {
		showAlert("error", error.message);
	}
};
