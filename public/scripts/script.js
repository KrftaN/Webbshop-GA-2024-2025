import { login } from "./login.js";
import { signup } from "./signup.js";
import { logout } from "./logout.js";
import { resetPassword } from "./resetPassword.js";
import { forgotPassword } from "./forgotPassword.js";
import { confirmEmail } from "./confirmEmail.js";

// Set up a response interceptor
axios.interceptors.response.use(
	(response) => {
		// Check if the response has a "status" property
		if (response.data && response.data.status) {
			const { status, message } = response.data;
			if (status === "success") {
				return response;
			} else if (status === "fail") {
				return Promise.reject(new Error(message));
			}
		}

		// If the response doesn't have a "status" property, treat it as an error
		return Promise.reject(new Error("Invalid response format"));
	},
	(error) => {
		// Check if the error is a network error or a response error
		if (!error.response) {
			return Promise.reject(new Error("Network error"));
		}

		// If there's a response, extract the error message
		const { data } = error.response;
		if (data && data.message) {
			return Promise.reject(new Error(data.message));
		}

		// If no specific error message is available, use a generic one
		return Promise.reject(new Error("An error occurred"));
	}
);

// Your other functions can now be simplified

document.addEventListener("DOMContentLoaded", function () {
	console.log("loaded dom!");

	// Function to check if an element with a given ID exists
	const getElementById = (id) => document.getElementById(id);

	const loginForm = getElementById("log-in-form");
	const signUpForm = getElementById("sign-up-form");
	const logOutForm = getElementById("log-out-form");
	const forgotPasswordForm = getElementById("forgot-password-form");
	const resetPasswordForm = getElementById("reset-password-form");
	const confirmEmailForm = getElementById("confirm-email-form");

	// Check if the required forms exist before adding event listeners
	if (loginForm) {
		loginForm.addEventListener("submit", function (e) {
			e.preventDefault();

			const email = getElementById("email").value;
			const password = getElementById("password").value;
			const keepLoggedIn = getElementById("checkbox")?.checked || false;

			login(email, password, keepLoggedIn);
		});
	}

	if (signUpForm) {
		signUpForm.addEventListener("submit", function (e) {
			e.preventDefault();

			const firstName = getElementById("firstName").value;
			const lastName = getElementById("lastName").value;
			const email = getElementById("email").value;
			const password = getElementById("password").value;
			const passwordConfirm = getElementById("passwordConfirm").value;
			const birthDate = getElementById("birthDate").value;
			const gender = document.querySelector('input[name="gender"]:checked').value;

			console.log(firstName, lastName, email, password, passwordConfirm, gender, birthDate);

			signup(firstName, lastName, email, password, passwordConfirm, gender, birthDate);
		});
	}

	if (forgotPasswordForm) {
		forgotPasswordForm.addEventListener("submit", function (e) {
			e.preventDefault();

			const email = getElementById("email").value;
			forgotPassword(email);
		});
	}

	if (resetPasswordForm) {
		resetPasswordForm.addEventListener("submit", function (e) {
			e.preventDefault();

			const password = getElementById("password").value;
			const passwordConfirm = getElementById("passwordConfirm").value;
			const token = getElementById("token").value;

			resetPassword(password, passwordConfirm, token);
		});
	}

	if (confirmEmailForm) {
		confirmEmailForm.addEventListener("submit", function (e) {
			e.preventDefault();

			confirmEmail();
		});
	}

	// Logout button
	if (logOutForm) {
		logOutForm.addEventListener("submit", function (e) {
			e.preventDefault();

			logout();
		});
	}
});
