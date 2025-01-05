const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.isLoggedIn = async (req, res, next) => {
	const token = req.cookies.jwt_token;
	if (token) {
		try {
			const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // Verifierar användarens token

			const currentUser = await User.findById(decoded.id); //Detta checkar så att en tokens användare fortfarande existerar

			if (!currentUser) {
				return next();
			}

			if (currentUser.changedPasswordAfter(decoded.iat)) {
				return next();
			}
			res.locals.user = currentUser; //Ger req variablen tillgång till användaren så att vi slipper göra databas queries
			return next(); /*  Ifall användaren har kommit till detta steg efter all gatekeeping (hihi) 
            kommer vi starta nästa middleware. Hoppas inte att någon jävel hittar en svaghet ;) */
		} catch (err) {
			return next();
		}
	}
	next();
};
