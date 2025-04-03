import { showAlert } from "./alerts.js";
export const signup = async (
	firstName,
	lastName,
	email,
	password,
	passwordConfirm,
	gender,
	birthDate
) => {
	try {
		await axios({
			method: "POST",
			url: `http://localhost:3000/api/v1/users/signup`,
			data: { firstName, lastName, email, password, passwordConfirm, gender, birthDate },
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
