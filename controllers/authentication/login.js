const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const { createAndSendToken } = require("../../utils/createAndSendToken");

exports.login = catchAsync(async (req, res, next) => {
	// Loggar in användare och ger sedan dem en token
	const { email, password, keepLoggedIn } = req.body;

	if (!email || !password) {
		return next(new AppError("Var god att förse oss med en E-post och lösenord!"), 400);
	}

	const user = await User.findOne({ email }).select("+password");
	//Gör en databas query för att hitta användaren. ".select("+password")" behövs eftersom att vi gömt lösenordet i databasen

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Inkorrekt E-post eller lösenord!", 401));
	}

	createAndSendToken(user, 200, res, keepLoggedIn);
});
