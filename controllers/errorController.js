const AppError = require("../utils/appError");

function removeFirstWord(string) {
	// Extract the message after the first space
	const indexOfSpace = string.indexOf(" ");
	if (indexOfSpace !== -1) {
		return string.slice(indexOfSpace + 1);
	}
	return string;
}

const handleCastErrorDB = (error) => {
	const message = `Ogiltig ${error.path}: ${error.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (error) => {
	//Detta kommer att fungera för just nu, men om det är flera saker som är dubbletter kommer programmet endast lista den första

	const key = Object.keys(error.keyValue)[0];
	const value = error.keyValue[key];

	const message = `Denna ${key} används redan. Var god att välja något annat än ${value}.`;

	return new AppError(message, 400);
};

const handleValidationErrorDB = (error) => {
	const errors = Object.values(error.errors).map((element) => element.message);
	const message = `${errors.join(". ")}`;

	return new AppError(message, 400);
};
const handleJsonWebTokenError = () => new AppError("Du är inte inloggad!", 401);
const TokenExpiredError = () =>
	new AppError("Din inloggning har gått ut, var god att logga in igen!", 401);

const sendErrorForDev = (error, req, res) => {
	if (!error.isOperational) {
		console.log("error: ", error.stack);
	} else {
		console.log(error.message);
	}

	if (req.originalUrl.startsWith("/api")) {
		res.status(error.statusCode).json({
			status: error.status,
			error,
			message: error.message,
			stack: error.stack,
		});
	} else {
		res.status(error.statusCode).render("error", {
			title: "Någonting gick fel!",
		});
	}
};

const sendErrorForProduction = (error, req, res) => {
	if (error.isOperational) {
		res.status(error.statusCode).json({
			status: error.status,
			statusCode: error.statusCode,
			message: error.message,
		});
	} else {
		console.error(error);

		res.status(500).json({
			status: "error",
			message: "Någonting gick fel!",
		});
	}
};

module.exports = (error, req, res, next) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorForDev(error, req, res);
	} else if (process.env.NODE_ENV === "production") {
		let err = { ...error };
		err.message = error.message;

		if (err.name === "CastError") err = handleCastErrorDB(err);
		if (err.code === 11000) err = handleDuplicateFieldsDB(err);
		if (err._message && removeFirstWord(err._message) === "validation failed")
			err = handleValidationErrorDB(err);
		if (err.name === "JsonWebTokenError") err = handleJsonWebTokenError();
		if (err.name === "TokenExpiredError") err = TokenExpiredError();

		sendErrorForProduction(err, req, res);
	}
};
