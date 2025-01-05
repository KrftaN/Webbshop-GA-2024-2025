const { catchAsync } = require("../../utils/catchAsync");
const User = require("../../models/userModel");

exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });
	res.status(204).json({
		status: "sucess",
		data: null,
	});
});
