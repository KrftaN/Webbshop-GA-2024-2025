const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const { createAndSendToken } = require("../../utils/createAndSendToken");

exports.updatePassword = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id).select("+password");

	if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
		return next(new AppError("Fel lösenord!", 401));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save({});

	createAndSendToken(user, 200, res);
});
