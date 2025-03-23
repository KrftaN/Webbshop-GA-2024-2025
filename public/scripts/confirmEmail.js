import { showAlert } from "./alerts.js";
export const confirmEmail = async (email, password, keepLoggedIn) => {
	try {
		const token = window.location.href.split("/").pop();

		console.log(token);

		await axios({
			method: "PATCH",
			url: `https://localhost:3000/api/v1/users/confirmEmail/${token}`,
			debug: false,
		});

		showAlert("success", "Confirmed your email successfully");
		window.setTimeout(() => {
			location.assign("/");
		}, 1500);
	} catch (error) {
		showAlert("error", error.message);
	}
};
