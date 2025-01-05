const { catchAsync } = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const User = require("../../models/userModel");

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm) {
		return next(new AppError("You cannot change your password here.", 400));
	}

	const filteredBody = filterObject(req.body, "name");
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: "success",
		data: {
			updatedUser,
		},
		statusCode: 200,
	});
});
