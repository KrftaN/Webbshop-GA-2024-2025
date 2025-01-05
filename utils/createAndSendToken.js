const jwt = require("jsonwebtoken");

const signToken = (id) => {
	//Skapar och signerar en token till användaren
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.createAndSendToken = (user, statusCode, res, keepLoggedIn) => {
	const token = signToken(user._id);
	const days = keepLoggedIn ? process.env.JWT_COOKIE_EXPIRES_IN : 1;

	let cookieOptions = {
		expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
	user.password = undefined; //This hides the password hash from the response
	if (user.passwordResetToken && user.passwordResetExpires) {
		// This just hides the passwordResetToken from the response if it exists.
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
	}

	res.cookie("jwt_token", token, cookieOptions);
	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};
