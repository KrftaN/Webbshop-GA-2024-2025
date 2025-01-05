exports.logout = (req, res, next) => {
	res.cookie("jwt_token", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({ status: "success" });
};
