import { showAlert } from "./alerts.js";
export const resetPassword = async (password, passwordConfirm, token) => {
	try {
		await axios({
			method: "PATCH",
			url: `http://localhost:3000/api/v1/users/resetPassword/${token}`,
			data: { password, passwordConfirm },
			debug: false,
		});

		showAlert("success", `Successfully reset your password`);
		window.setTimeout(() => {
			location.assign("/");
		}, 1500);
	} catch (error) {
		showAlert("error", error.message);
	}
};
