const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const sendEmail = require("../../utils/email");
const crypto = require("crypto");

exports.signup = catchAsync(async (req, res, next) => {
	//Skapar en ny användare och ger dem en token
	const { firstName, lastName, email, password, passwordConfirm, birthDate, gender } = req.body;

	const resetToken = crypto.randomBytes(32).toString("hex");

	const emailConfirmationToken = crypto.createHash("sha256").update(resetToken).digest("hex");

	await User.create({
		firstName,
		lastName,
		email,
		password,
		passwordConfirm,
		birthDate,
		gender,
		passwordChangedAt: Date.now() - 1000,
		emailConfimationExpires: Date.now() + 10 * 60 * 1000,
		emailConfirmationToken,
	});

	try {
		const subject = "Bekräfta din E-post | Klasskassan UF";
		const message = `Var god att bekräfta din E-post genom denna länk: ${
			req.protocol
		}://${req.get("host")}/bekrafta-email/${resetToken}`;

		await sendEmail({
			email,
			subject,
			message,
		});
	} catch (error) {
		console.log(error);
		return next(new AppError("There was an error sending email", 500));
	}

	res.status(200).json({
		status: "success",
		message: "Var god att bekräfta din E-post. Om du inte får ett email kolla spam!",
	});
});
