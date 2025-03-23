import { showAlert } from "./alerts.js";
export const logout = async () => {
	try {
		await axios({
			method: "POST",
			url: `https://localhost:3000/api/v1/users/logout`,
			debug: false,
		}).then(() => {
			location.assign("/");
		});
	} catch (error) {
		console.log(error);

		showAlert("error", error.message);
	}
};
