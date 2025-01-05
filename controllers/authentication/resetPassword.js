const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const crypto = require("crypto");
const { createAndSendToken } = require("../../utils/createAndSendToken");

exports.resetPassword = catchAsync(async (req, res, next) => {
	const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex"); //Detta skapar en lätt krypterad token som kan användas för att återställa lösenord

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) return next(new AppError("Länken är ogiltig eller har gått ut", 400));

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save({});

	createAndSendToken(user, 200, res);
});
