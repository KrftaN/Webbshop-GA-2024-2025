const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const sendEmail = require("../../utils/email");

exports.forgotPassword = catchAsync(async (req, res, next) => {
	const email = req.body.email;

	const user = await User.findOne({ email });
	if (!user) return next(new AppError("Ingen användare med den E-posten hittades!", 404));

	const resetToken = await user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	const resetURL = `${req.protocol}://${req.get("host")}/aterstall-losenord/${resetToken}`;
	const message = `Glömt ditt lösenord? Återställ genom denna länk ${resetURL}`;

	try {
		await sendEmail({
			email,
			subject: "Återställ ditt lösenord | Klasskassan UF",
			message,
		});
	} catch (error) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		console.log(error);
		return next(new AppError("Ett problem har uppstått!", 500));
	}

	res.status(200).json({
		status: "success",
		statusCode: 200,
		message: "Ditt återställningsmejl har skickats!",
	});
});
