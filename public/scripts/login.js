import { showAlert } from "./alerts.js";
export const login = async (email, password, keepLoggedIn) => {
	try {
		await axios({
			method: "POST",
			url: `http://localhost:3000/api/v1/users/login`,
			data: { email, password, keepLoggedIn },
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
