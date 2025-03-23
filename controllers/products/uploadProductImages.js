const multer = require("multer");
const AppError = require("../../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Inte en bild! Var god att endast ladda upp bilder!", 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([
	{
		name: "productImage",
		maxCount: 1,
	},
	{
		name: "manufacturerImage",
		maxCount: 1,
	},
]);
