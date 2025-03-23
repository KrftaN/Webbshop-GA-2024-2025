const AppError = require("../../utils/appError");

exports.permission = (...roles) => {
	//Säkerställer att användaren har rätt behörigheter för http requesten
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			/* Eftersom att vi passerade användarobjektet till req parametern i det förgående middlewaret kan har vi nu tillgång till 
		användaren utan att behöva göra en databas query. */
			return next(new AppError("Du har inte tillgång till att utföra denna åtgärd!", 403));
		}
		next();
	};
};
