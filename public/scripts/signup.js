import { showAlert } from "./alerts.js";
export const signup = async (name, email, password, passwordConfirm) => {
	try {
		await axios({
			method: "POST",
			url: `https://localhost:3000/api/v1/users/signup`,
			data: { name, email, password, passwordConfirm },
			debug: false,
		});

		showAlert("success", `Bekräftningsmail skickat till ${email}`);
		window.setTimeout(() => {
			location.assign("/");
		}, 1500);
	} catch (error) {
		showAlert("error", error.message);
	}
};
