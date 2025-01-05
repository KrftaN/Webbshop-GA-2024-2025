const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const crypto = require("crypto");

exports.confirmEmail = catchAsync(async (req, res, next) => {
	const emailConfirmationToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		emailConfirmationToken,
		emailConfimationExpires: { $gt: Date.now() },
	})
		.select("+emailConfirmed")
		.includeNonConfirmed();

	if (!user) {
		return next(new AppError("Länken är ogiltig eller har gått ut!", 400));
	}

	user.emailConfirmed = true;
	user.emailConfirmationToken = undefined;
	user.emailConfimationExpires = undefined;
	await user.save({ validateBeforeSave: false });

	res.status(200).json({
		status: "success",
		statusCode: 200,
		message: "Din E-post är nu bekräftad!",
	});
});
