const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");
exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		status: "success",
		result: users.length,
		data: { users },
	});
});
