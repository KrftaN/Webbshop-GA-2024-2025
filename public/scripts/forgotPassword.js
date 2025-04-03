import { showAlert } from "./alerts.js";
export const forgotPassword = async (email) => {
	try {
		await axios({
			method: "POST",
			url: `http://localhost:3000/api/v1/users/forgotPassword`,
			data: { email },
			debug: false,
		});

		showAlert("success", `Sent reset email to ${email}`);
		window.setTimeout(() => {
			location.assign("/");
		}, 1500);
	} catch (error) {
		showAlert("error", error.message);
	}
};
