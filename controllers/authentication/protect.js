const { promisify } = require("util");
const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
	//Skyddar routes från icke-inloggade användare
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1]; //Extraherar användarens token genom headern
	} else if (req.cookies.jwt_token) {
		token = req.cookies.jwt_token;
	}
	if (!token) return next(new AppError("Du är inte inloggad!", 401));

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // Verifierar användarens token

	const currentUser = await User.findById(decoded.id); //Detta checkar så att en tokens användare fortfarande existerar
	if (!currentUser) {
		return next(new AppError("Användaren existerar inte!", 401));
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		//Detta checkar så att användaren inte har ändrat lösenord efter att sin token blev signerad
		return next(
			new AppError("Användaren har nyligen bytt lösenord, var god logga in igen!", 401)
		);
	}

	req.user = currentUser; //Ger req variablen tillgång till användaren så att vi slipper göra databas queries
	next(); /*  Ifall användaren har kommit till detta steg efter all gatekeeping (hihi) 
	kommer vi starta nästa middleware. Hoppas inte att någon jävel hittar en svaghet ;) */
});
